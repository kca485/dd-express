import { Router } from "express";
import {
  sendMagicLink,
  confirmMagicLink,
  getUser,
  getSession,
} from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", sendMagicLink);
authRouter.get("/confirm", confirmMagicLink);
authRouter.get("/user", getUser);
authRouter.get("/session", getSession);

export { authRouter };
