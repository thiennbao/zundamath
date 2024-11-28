import express from "express";
import authController from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/signup", authController.signup);

export default authRouter;
