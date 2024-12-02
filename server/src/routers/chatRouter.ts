import express from "express";
import chatController from "../controllers/chatController";

const chatRouter = express.Router();

chatRouter.post("/", chatController.chat);
chatRouter.get("/", chatController.getChats);
chatRouter.delete("/", chatController.deleteChats);
chatRouter.get("/:id", chatController.loadChat);
chatRouter.delete("/:id", chatController.deleteChat);
chatRouter.patch("/:id/share", chatController.shareChat);

export default chatRouter;
