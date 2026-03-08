import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { createNewChat, getAllChat, getMessagesByChat, sendMessage } from "../controllers/chat.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post('/chat/new', isAuth, createNewChat);
router.get('/chat/all', isAuth, getAllChat);
router.post('/message', isAuth, upload.single('image'), sendMessage);
router.get('/message/:chatId', isAuth, getMessagesByChat);

export default router;