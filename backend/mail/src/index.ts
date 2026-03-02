import express from "express";
import dotenv from "dotenv";
import { startSendOtpConsumer } from "./consumer.js";

dotenv.config();
const app = express();

startSendOtpConsumer();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
