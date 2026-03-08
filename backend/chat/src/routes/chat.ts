import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { createNewChat, getAllChat } from "../controllers/chat.js";

const router = express.Router();

router.post('/chat/new', isAuth, createNewChat);
router.get('/chat/all', isAuth, getAllChat);

export default router;