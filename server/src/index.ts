import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import chatRouter from "./routers/chatRouter";
import authRouter from "./routers/authRouter";

const app = express();

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/chat", chatRouter);
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, async () => console.log("Server is running..."));
