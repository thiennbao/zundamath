import { Request, Response } from "express";
import axios from "axios";

const chatController = {
  chat: async (req: Request, res: Response) => {
    if (!req.body.message || !req.body.chatId) {
      res.status(400).json({ message: "Bad request" });
      return;
    }
    const { message, chatId } = req.body;
    try {
      const resMsg = await axios.post(process.env.CHAT_URL as string, { message });
      res.status(200).json({ message: resMsg.data.message });
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
