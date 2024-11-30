import { Request, Response } from "express";
import axios from "axios";
import prisma from "../utils/prisma";
import { MessageType } from "@prisma/client";

const chatController = {
  chat: async (req: Request, res: Response) => {
    if (!req.body.message) {
      res.status(400).json({ message: "Bad request" });
      return;
    }
    const { accountId, chatId, message } = req.body;
    try {
      const resMsg = await axios.post(process.env.CHAT_URL as string, { message });
      if (accountId) {
        const id = chatId ?? (await prisma.chat.create({ data: { accountId } })).id;
        await prisma.message.createMany({
          data: [
            { content: message, type: MessageType.REQUEST, chatId: id },
            { content: resMsg.data.message, type: MessageType.RESPONSE, chatId: id },
          ],
        });
        res.status(200).json({ message: resMsg.data.message, chatId: id });
      } else {
        res.status(200).json({ message: resMsg.data.message });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server internal error" });
    }
  },

  getChats: (req: Request, res: Response) => {
    res.send("Get chat list");
  },
  loadChat: async (req: Request, res: Response) => {
    if (!req.params.id) {
      res.status(400).json({ message: "Bad request" });
      return;
    }
    const { id } = req.params;
    const { accountId } = req.query;
    try {
      const chat = await prisma.chat.findUnique({
        where: accountId ? { id, accountId: accountId as string } : { id, shared: true },
        include: { messages: { orderBy: { datetime: "asc" } } },
      });
      if (chat) {
        res.status(200).json({ chat });
      } else {
        res.status(404).json({ message: "Chat not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server internal error" });
    }
  },
  deleteChat: (req: Request, res: Response) => {
    res.send("Delete a chat");
  },
  shareChat: (req: Request, res: Response) => {
    res.send("Share a chat");
  },
};

export default chatController;
