import express from "express";
import "dotenv/config";

const app = express();

app.listen(process.env.PORT, async () => console.log("Server is running..."));
