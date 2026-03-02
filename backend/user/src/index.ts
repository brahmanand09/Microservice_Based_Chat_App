import express from "express";
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import { createClient } from "redis";
import userRouters from "./routes/user.js";
import { connectRabbitMQ } from "./config/rabbitmq.js";
import cors from "cors";

dotenv.config();
connectDb();
connectRabbitMQ();

if (!process.env.REDIS_URI) {
  throw new Error("REDIS_URI is not defined in .env");
}
 
export const redisClient = createClient({
    url: process.env.REDIS_URI,
});

redisClient.connect().then(() => console.log("connected to redis")).catch(console.error);

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', userRouters);
 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
