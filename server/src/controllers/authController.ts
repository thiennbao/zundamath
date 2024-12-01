import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";

const authController = {
  signup: async (req: Request, res: Response) => {
    if (!req.body.username || !req.body.password) {
      res.status(400).json({ message: "Bad request" });
      return;
    }
    const { username, password } = req.body;
    try {
      const hasTaken = await prisma.account.count({ where: { username } });
      if (hasTaken) {
        res.status(409).json({ message: "This username has already taken" });
        return;
      }
      const hashed = await bcrypt.hash(password, 10);
      const newAccount = await prisma.account.create({ data: { username, password: hashed } });
      const token = jwt.sign(newAccount.id, process.env.JWT_KEY as string);
      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server internal error" });
    }
  },
  login: async (req: Request, res: Response) => {
    if (!req.body.username || !req.body.password) {
      res.status(400).json({ message: "Bad request" });
      return;
    }
    const { username, password } = req.body;
    try {
      const foundAccount = await prisma.account.findUnique({ where: { username } });
      if (!foundAccount) {
        res.status(404).json({ message: "Username not found" });
        return;
      }
      const isMatched = await bcrypt.compare(password, foundAccount.password);
      if (!isMatched) {
        res.status(401).json({ message: "Wrong password" });
        return;
      }
      const token = jwt.sign(foundAccount.id, process.env.JWT_KEY as string);
      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server internal error" });
    }
  },
  verify: async (req: Request, res: Response) => {
    if (!req.body.token) {
      res.status(400).json({ message: "Bad request" });
      return;
    }
    const { token } = req.body;
    try {
      jwt.verify(token, process.env.JWT_KEY as string);
      res.status(200).json({ message: "Token verified", verified: true });
    } catch (error) {
      console.log(error);
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(200).json({ message: "Invalid token", verified: false });
      } else {
        res.status(500).json({ message: "Server internal error" });
      }
    }
  },
  change: async (req: Request, res: Response) => {
    if (!req.body.token || !req.body.current || !req.body.password) {
      res.status(400).json({ message: "Bad request" });
      return;
    }
    const { token, current, password } = req.body;
    try {
      const id = jwt.verify(token, process.env.JWT_KEY as string) as string;
      const foundAccount = await prisma.account.findUnique({ where: { id } });
      if (!foundAccount) {
        res.status(404).json({ message: "Username not found" });
        return;
      }
      const isMatched = await bcrypt.compare(current, foundAccount.password);
      if (!isMatched) {
        res.status(401).json({ message: "Wrong password" });
        return;
      }
      const hashed = await bcrypt.hash(password, 10);
      await prisma.account.update({ where: { id }, data: { password: hashed } });
      res.status(200).json({ message: "Changed password successfully" });
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(200).json({ message: "Invalid token", decoded: null });
      } else {
        console.log(error);
        res.status(500).json({ message: "Server internal error" });
      }
    }
  },
};

export default authController;
