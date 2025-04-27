import { Router } from "express";
import { sendMagicLink, confirmMagicLink } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", sendMagicLink);
authRouter.get("/confirm", confirmMagicLink);

export { authRouter };
