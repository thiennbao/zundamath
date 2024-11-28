import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { MessageType } from "@prisma/client";

const chatController = {
  chat: async (req: Request, res: Response) => {
    if (!req.body.content || !req.body.chatId) {
      res.status(400).json({ message: "Bad request" });
      return;
    }
    const { content, chatId } = req.body;
    try {
      const resContent = "Lorem ipsum odor amet"; // Call chatbox service...
      res.status(200).json({ data: resContent });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server internal error" });
    }
  },

  getChats: (req: Request, res: Response) => {
    res.send("Get chat list");
  },
  loadChat: (req: Request, res: Response) => {
    res.send("Load a chat");
  },
  deleteChat: (req: Request, res: Response) => {
    res.send("Delete a chat");
  },
  shareChat: (req: Request, res: Response) => {
    res.send("Share a chat");
  },
};

export default chatController;
