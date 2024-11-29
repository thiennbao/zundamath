import express from "express";
import authController from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/signup", authController.signup);
authRouter.post("/verify", authController.verify);
authRouter.patch("/change", authController.change);

export default authRouter;
