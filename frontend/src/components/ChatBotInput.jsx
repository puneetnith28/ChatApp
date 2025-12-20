import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addChatbotMessage } from '../redux/messageSlice';
import axios from 'axios';
import { BASE_URL } from '../index';

const ChatBotInput = () => {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { chatbotMessages } = useSelector(store => store.message);
    const { authUser } = useSelector(store => store.user);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMessage = {
            _id: Date.now().toString(),
            message: message,
            senderId: authUser?._id,
            isBot: false,
            createdAt: new Date()
        };

        dispatch(addChatbotMessage(userMessage));
        setMessage("");
        setIsLoading(true);

        try {
            // Call backend chatbot route
            const response = await axios.post(`${BASE_URL}/api/v1/chatbot/chat`, {
                message: message,
                conversationHistory: (chatbotMessages || []).slice(-10).map(msg => ({
                    role: msg.isBot ? "assistant" : "user",
                    content: msg.message
                }))
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            const botMessage = {
                _id: (Date.now() + 1).toString(),
                message: response.data.message,
                senderId: 'bot',
                isBot: true,
                createdAt: new Date()
            };

            dispatch(addChatbotMessage(botMessage));
        } catch (error) {
            console.error('OpenAI API Error:', error);
            console.error('Error details:', error.response?.data);
            
            let errorMsg = "Sorry, I'm having trouble connecting right now.";
            
            if (error.response?.status === 401) {
                errorMsg = "You need to be logged in to use the AI assistant.";
            } else if (error.response?.data?.error) {
                errorMsg = error.response.data.error;
            } else if (error.message?.includes('Network')) {
                errorMsg = "Network error. Please check if the backend server is running.";
            }
            
            const errorMessage = {
                _id: (Date.now() + 1).toString(),
                message: errorMsg,
                senderId: 'bot',
                isBot: true,
                createdAt: new Date()
            };
            dispatch(addChatbotMessage(errorMessage));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} style={{ 
            padding: '16px 20px', 
            borderTop: '2px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(30, 30, 40, 0.6)',
            flexShrink: 0,
            position: 'relative',
            bottom: 0
        }}>
            <div style={{ position: 'relative', width: '100%' }}>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder={isLoading ? 'AI is thinking...' : 'Ask me anything...'}
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '14px 50px 14px 16px',
                        fontSize: '15px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        backgroundColor: isLoading ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s ease',
                        opacity: isLoading ? 0.6 : 1
                    }}
                    onFocus={(e) => {
                        if (!isLoading) {
                            e.target.style.borderColor = '#6366f1';
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                        }
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }}
                />
                <button
                    type="submit"
                    disabled={isLoading || !message.trim()}
                    style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: (isLoading || !message.trim()) ? '#4b5563' : '#6366f1',
                        border: 'none',
                        color: '#ffffff',
                        cursor: (isLoading || !message.trim()) ? 'not-allowed' : 'pointer',
                        fontSize: '18px',
                        padding: '10px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        opacity: (isLoading || !message.trim()) ? 0.5 : 1
                    }}
                    onMouseEnter={(e) => {
                        if (!isLoading && message.trim()) {
                            e.currentTarget.style.backgroundColor = '#4f46e5';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isLoading && message.trim()) {
                            e.currentTarget.style.backgroundColor = '#6366f1';
                        }
                    }}
                >
                    {isLoading ? (
                        <div style={{
                            width: '18px',
                            height: '18px',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderTop: '2px solid white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                    ) : (
                        <IoSend />
                    )}
                </button>
            </div>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </form>
    );
};

export default ChatBotInput;
