import express from "express";
import { chatWithBot } from "../controllers/chatbotController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Main chat endpoint (requires authentication)
router.post("/chat", isAuthenticated, chatWithBot);

// Test endpoint (no authentication required - for testing only)
router.post("/test", chatWithBot);

export default router;
