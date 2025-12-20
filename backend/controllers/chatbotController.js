import axios from 'axios';

// AI Provider configurations
const AI_PROVIDERS = {
    OLLAMA: {
        name: 'Ollama',
        apiUrl: 'http://localhost:11434/api/chat',
        model: 'phi',
        envKey: 'OLLAMA_MODEL'
    },
    GEMINI: {
        name: 'Google Gemini',
        apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
        model: 'gemini-2.5-flash',
        envKey: 'GEMINI_API_KEY'
    }
};

// Get active AI provider from environment
const getActiveProvider = () => {
    const providerName = process.env.AI_PROVIDER || 'GEMINI';
    return AI_PROVIDERS[providerName] || AI_PROVIDERS.GEMINI;
};

// Call Ollama (local AI)
const callOllama = async (message, conversationHistory) => {
    const model = process.env.OLLAMA_MODEL || 'phi';
    
    const messages = [
        {
            role: "system",
            content: "You are a helpful AI assistant in a chat application. Be friendly, conversational, and helpful."
        },
        ...(conversationHistory || []),
        {
            role: "user",
            content: message
        }
    ];

    const response = await axios.post('http://localhost:11434/api/chat', {
        model: model,
        messages: messages,
        stream: false
    });

    return response.data.message.content;
};

// Call Google Gemini API
const callGemini = async (message, conversationHistory, apiKey) => {
    const contents = [];

    // Add conversation history in Gemini-native format
    if (conversationHistory && conversationHistory.length > 0) {
        conversationHistory.forEach(msg => {
            contents.push({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            });
        });
    }

    // Add current user message
    contents.push({
        role: 'user',
        parts: [{ text: message }]
    });

    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
            contents,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000
            }
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data.candidates[0].content.parts[0].text;
};

export const chatWithBot = async (req, res) => {
    try {
        const { message, conversationHistory } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const provider = getActiveProvider();
        const apiKey = process.env[provider.envKey];

        // Check if API key is configured (not needed for Ollama)
        if (provider.name !== 'Ollama' && (!apiKey || apiKey === 'your_api_key_here')) {
            const mockResponses = [
                `I'm a demo chatbot. To enable full AI capabilities with ${provider.name}, please add your API key to the backend .env file.`,
                "Hello! I'm currently running in demo mode. I can help you test the chat interface!",
                `You said: "${message}". This is a mock response since ${provider.name} API is not configured.`
            ];
            
            const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
            
            return res.status(200).json({
                success: true,
                message: randomResponse,
                provider: 'demo'
            });
        }

        let botReply;

        // Call the appropriate AI provider
        if (provider.name === 'Ollama') {
            botReply = await callOllama(message, conversationHistory);
        } else {
            botReply = await callGemini(message, conversationHistory, apiKey);
        }

        return res.status(200).json({
            success: true,
            message: botReply,
            provider: provider.name
        });

    } catch (error) {
        console.error('AI API Error:', error.response?.data || error.message);
        
        let errorMessage = "Sorry, I'm having trouble connecting right now.";
        
        if (error.response?.status === 401) {
            errorMessage = "Invalid API key. Please check your AI provider API key configuration.";
        } else if (error.response?.status === 429) {
            errorMessage = "API rate limit exceeded. Your account may be out of credits or on free tier limits.";
        } else if (error.code === 'ECONNREFUSED' && process.env.AI_PROVIDER === 'OLLAMA') {
            errorMessage = "Cannot connect to Ollama. Make sure Ollama is running locally (ollama serve).";
        } else if (error.response?.data?.error?.message) {
            errorMessage = error.response.data.error.message;
        }

        return res.status(500).json({
            success: false,
            error: errorMessage
        });
    }
};
