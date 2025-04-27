import { Router } from "express";
import {
  sendMagicLink,
  confirmMagicLink,
  getSession,
} from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", sendMagicLink);
authRouter.get("/confirm", confirmMagicLink);
authRouter.get("/session", getSession);

export { authRouter };
