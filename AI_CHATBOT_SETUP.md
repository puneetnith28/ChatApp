# AI Chatbot Setup Instructions

## 🤖 AI Assistant Integration

This chat application includes an AI Assistant powered by **Google Gemini** (default) or **Ollama** (local AI).

### Option 1: Google Gemini (Default - Cloud-based)

#### Setup Steps:

1. **Get Google Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the API key

2. **Configure Environment Variable**
   - Open (or create) the `.env` file in the `backend` folder
   - Add your Gemini API key:
   ```
   GEMINI_API_KEY=your-gemini-api-key-here
   AI_PROVIDER=GEMINI
   ```

3. **Restart the Backend Server**
   - Stop the backend server (Ctrl+C)
   - Run `npm start` again in the backend folder
   - The AI Assistant will now work with Gemini!

### Option 2: Ollama (Local - Free)

#### Setup Steps:

1. **Install Ollama**
   - Download from [Ollama.ai](https://ollama.ai)
   - Install on your system (Windows/Mac/Linux)

2. **Pull a Model**
   - Open terminal and run:
   ```
   ollama pull phi
   ```
   - Or choose another model: `llama2`, `mistral`, `codellama`, etc.

3. **Start Ollama Server**
   ```
   ollama serve
   ```

4. **Configure Environment Variable**
   - Open (or create) the `.env` file in the `backend` folder
   - Add:
   ```
   AI_PROVIDER=OLLAMA
   OLLAMA_MODEL=phi
   ```

5. **Restart the Backend Server**
   - The AI Assistant will now use Ollama locally!

### How to Use:

1. **Access AI Assistant**
   - The AI Assistant appears at the top of your users list
   - Click on "AI Assistant" to start chatting

2. **Chat with AI**
   - Type your message in the input field
   - Press Enter or click the send button
   - Wait for the AI to respond (loading indicator shows while processing)

3. **Features**
   - Real-time AI responses using Gemini 2.5 Flash (cloud) or Phi/other models (local)
   - Conversation history maintained during session
   - Context-aware responses based on previous messages
   - Works on both desktop and mobile

### Important Notes:

- ⚠️ Keep your API key secret and never commit it to version control
- 💰 **Gemini**: Free tier available with generous limits - [check pricing](https://ai.google.dev/pricing)
- 🆓 **Ollama**: Completely free, runs locally on your machine
- 📊 The chatbot remembers the last 10 messages for context
- 🔄 Refresh the page to clear chatbot conversation history

### Troubleshooting:

**"Sorry, I'm having trouble connecting..."**
- **Gemini**: Check if your API key is correctly configured in backend `.env`
- **Gemini**: Verify you have API quota available
- **Ollama**: Ensure Ollama is running (`ollama serve`)
- **Ollama**: Check if the model is installed (`ollama list`)
- Verify the backend server is running
- Check backend console for detailed error messages

**API Key Not Working (Gemini):**
- Make sure there are no extra spaces in the `.env` file
- Restart the backend server after changing `.env`
- Verify the API key is active on Google AI Studio
- Ensure `AI_PROVIDER=GEMINI` is set in `.env`

**Ollama Connection Error:**
- Run `ollama serve` in a separate terminal
- Check if Ollama is installed: `ollama --version`
- Pull the model if needed: `ollama pull phi`
- Verify `AI_PROVIDER=OLLAMA` in backend `.env`

### Comparison: Gemini vs Ollama

| Feature | Google Gemini | Ollama |
|---------|---------------|--------|
| **Cost** | Free tier + paid | Completely free |
| **Speed** | Very fast | Moderate (depends on hardware) |
| **Setup** | API key only | Install + download models |
| **Internet** | Required | Not required |
| **Privacy** | Cloud-based | Runs locally |
| **Models** | Gemini 2.5 Flash | phi, llama2, mistral, etc. |

### Alternative: Demo Mode

If you don't want to configure AI right away:
- The chatbot will show demo responses
- You can still test the chat interface
- Other user-to-user chat features work normally
- Add your API key or setup Ollama later when ready

---

Enjoy chatting with your AI Assistant! 🚀
