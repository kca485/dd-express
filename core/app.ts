import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "../routes/authRouter";
import { placeRouter } from "../routes/placeRouter";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/auth", authRouter);
app.use("/v1/api/place", placeRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
