# 💬 Real-Time Chat Application with AI Assistant

A modern, responsive full-stack real-time chat application built with the MERN stack, featuring Socket.io for real-time communication and AI integration (Google Gemini or Ollama) for an intelligent chatbot assistant.

## ✨ Features

### 🔐 Authentication & User Management
- **User Registration & Login** - Secure authentication with JWT tokens
- **Password Encryption** - Bcrypt.js for secure password hashing
- **Persistent Sessions** - Redux Persist for maintaining user sessions
- **Profile Photos** - Avatar support with gender-based default images

### 💬 Real-Time Messaging
- **Instant Messaging** - Real-time chat using Socket.io
- **Online Status** - See which users are currently online
- **Message History** - Persistent message storage in MongoDB
- **Conversation Management** - One-on-one conversations with users
- **Read Receipts** - Track message delivery and read status

### 🤖 AI Chatbot Assistant
- **Flexible AI Integration** - Supports Google Gemini (cloud) or Ollama (local)
- **Demo Mode** - Works without API key for testing
- **Context-Aware** - Remembers conversation history (last 10 messages)
- **Smart Responses** - Helpful, friendly, and concise AI replies
- **Secure Backend** - AI calls handled server-side
- **Privacy Options** - Choose cloud (Gemini) or local (Ollama) processing

### 📱 Responsive Design
- **Mobile-First** - WhatsApp-like mobile interface
- **Desktop Optimized** - Clean, modern desktop layout
- **Adaptive UI** - Seamlessly transitions between screen sizes
- **Back Navigation** - Easy navigation on mobile devices
- **Touch-Friendly** - Optimized for touch interactions

### 🎨 Modern UI/UX
- **Glassmorphism** - Beautiful glass-effect design with backdrop blur
- **Dark Theme** - Eye-friendly dark color scheme with indigo accents
- **Smooth Animations** - Polished transitions and hover effects
- **Custom Scrollbars** - Styled scrollbars matching the theme
- **Message Bubbles** - Different styles for sent/received messages
- **Online Indicators** - Glowing status badges for online users

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library
- **Redux Toolkit** - State management
- **Redux Persist** - Persistent state storage
- **React Router DOM** - Client-side routing
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **React Hot Toast** - Beautiful notifications
- **React Icons** - Icon library
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.io** - Real-time bidirectional communication
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt.js** - Password hashing
- **Cookie Parser** - Cookie handling middleware
- **CORS** - Cross-origin resource sharing
- **Axios** - HTTP client for AI API calls

### Additional Tools
- **Google Gemini API** - Cloud-based AI (default)
- **Ollama** - Local AI models (optional)
- **Nodemon** - Development auto-restart
- **Dotenv** - Environment variable management

**Happy Chatting! 💬✨**
