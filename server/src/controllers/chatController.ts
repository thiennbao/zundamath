import { Request, Response } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";
import { MessageType } from "@prisma/client";

const chatController = {
  chat: async (req: Request, res: Response) => {
    if (!req.body.message) {
      res.status(400).json({ message: "Bad request" });
      return;
    }
    const { token, chatId, message } = req.body;
    try {
      const resMsg = await axios.post(process.env.CHAT_URL as string, { message });
      try {
        const accountId = jwt.verify(token, process.env.JWT_KEY as string) as string;
        if (chatId) {
          const foundChat = await prisma.chat.findUnique({ where: { id: chatId } });
          if (foundChat) {
            if (accountId === foundChat.accountId) {
              // Insert msg if the owner
              await prisma.message.createMany({
                data: [
                  { content: message, type: MessageType.REQUEST, chatId },
                  { content: resMsg.data.message, type: MessageType.RESPONSE, chatId },
                ],
              });
            }
            res.status(200).json({ message: resMsg.data.message, chatId });
          } else {
            res.status(404).json({ message: "Chat not found" });
          }
        } else {
          // Create new chat if no chatId
          const newChat = await prisma.chat.create({ data: { accountId, title: message } });
          await prisma.message.createMany({
            data: [
              { content: message, type: MessageType.REQUEST, chatId: newChat.id },
              { content: resMsg.data.message, type: MessageType.RESPONSE, chatId: newChat.id },
            ],
          });
          res.status(200).json({ message: resMsg.data.message, chatId: newChat.id });
        }
      } catch (error: any) {
        if (error instanceof jwt.JsonWebTokenError) {
          // Just res msg if has not logged
          res.status(200).json({ message: resMsg.data.message });
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server internal error" });
    }
  },
  getChats: async (req: Request, res: Response) => {
    const { token } = req.query;
    try {
      const accountId = jwt.verify(token as string, process.env.JWT_KEY as string) as string;
      const chats = await prisma.chat.findMany({ where: { accountId }, orderBy: { datetime: "desc" } });
      res.status(200).json({ chats });
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(200).json({ chats: [] });
        return;
      }
      console.log(error);
      res.status(500).json({ message: "Server internal error" });
    }
  },
  deleteChats: async (req: Request, res: Response) => {
    const { token } = req.query;
    try {
      const accountId = jwt.verify(token as string, process.env.JWT_KEY as string) as string;
      await prisma.chat.deleteMany({ where: { accountId } });
      res.status(200).json({ message: "Delete all chats successfully" });
    } catch (error: any) {
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      console.log(error);
      res.status(500).json({ message: "Server internal error" });
    }
  },
  loadChat: async (req: Request, res: Response) => {
    if (!req.params.id) {
      res.status(400).json({ message: "Bad request" });
      return;
    }
    const { id } = req.params;
    const { token } = req.query;
    try {
      const foundChat = await prisma.chat.findUnique({
        where: { id },
        include: { messages: { orderBy: { datetime: "asc" } } },
      });
      if (!foundChat) {
        // Chat not found
        res.status(404).json({ message: "Chat not found" });
        return;
      } else if (foundChat.shared) {
        // Chat is shared
        res.status(200).json({ chat: foundChat });
        return;
      } else {
        // Chat is not shared
        try {
          const accountId = jwt.verify(token as string, process.env.JWT_KEY as string) as string;
          if (accountId === foundChat.accountId) {
            res.status(200).json({ chat: foundChat });
          } else {
            res.status(404).json({ message: "Chat not found" });
          }
        } catch (error: any) {
          if (error instanceof jwt.JsonWebTokenError) {
            res.status(404).json({ message: "Chat not found" });
          } else {
            throw error;
          }
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server internal error" });
    }
  },
  deleteChat: async (req: Request, res: Response) => {
    if (!req.params.id) {
      res.status(400).json({ message: "Bad request" });
      return;
    }
    const { id } = req.params;
    const { token } = req.query;
    try {
      const accountId = jwt.verify(token as string, process.env.JWT_KEY as string) as string;
      const foundChat = await prisma.chat.findUnique({ where: { id } });
      if (!foundChat) {
        res.status(404).json({ message: "Chat not found" });
        return;
      }
      if (accountId !== foundChat.accountId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      await prisma.chat.delete({ where: { id } });
      res.status(200).json({ message: "Delete chat successfully" });
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      console.log(error);
      res.status(500).json({ message: "Server internal error" });
    }
  },
  shareChat: async (req: Request, res: Response) => {
    if (!req.params.id || req.body.tobeShared === null) {
      res.status(400).json({ message: "Bad request" });
      return;
    }
    const { id } = req.params;
    const { token, tobeShared } = req.body;
    try {
      jwt.verify(token as string, process.env.JWT_KEY as string) as string;
      // const foundChat = await prisma.chat.findUnique({ where: { id } });

      await prisma.chat.update({ where: { id }, data: { shared: tobeShared } });
      res.status(200).json({ message: "Change chat share mode successfully", shared: tobeShared });
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      console.log(error);
      res.status(500).json({ message: "Server internal error" });
    }
  },
};

export default chatController;
