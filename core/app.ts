import express from "express";
import cors from "cors";
import { createClient } from "../config/supabase";
import { authRouter } from "../routes/authRouter";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}
app.use(express.json());

app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
