import express from "express";
import cors from "cors";
import { authRouter } from "../routes/authRouter";
import { placeRouter } from "../routes/placeRouter";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}
app.use(express.json());

app.use("/auth", authRouter);
app.use("/v1/api/place", placeRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
