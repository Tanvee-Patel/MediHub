import express from "express";
import { getAllMessages, sendMessage } from "../controller/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Route to send a message (Add authentication if needed)
router.post("/send", sendMessage);

// Route to get all messages (Admin only)
router.get("/getall", isAdminAuthenticated, getAllMessages);

export default router;