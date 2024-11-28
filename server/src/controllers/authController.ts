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
      await prisma.account.create({ data: { username, password: hashed } });
      const token = jwt.sign(username, process.env.JWT_KEY as string);
      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server internal error" });
    }
  },
  login: async (req: Request, res: Response) => {
    res.send("Log in");
  },
};

export default authController;
