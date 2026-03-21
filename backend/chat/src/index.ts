import express, { json } from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import chatRoutes from "./routes/chat.js";
import cors from 'cors';
import { app, server } from "./config/socket.js";

dotenv.config();

connectDb();

app.use(express.json());
app.use(cors());

app.use('/api/v1', chatRoutes);

server.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
});
