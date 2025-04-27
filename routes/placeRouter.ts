import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createPlace,
  deletePlace,
  getAllPlaces,
  updatePlace,
} from "../controllers/placeController";

const placeRouter = Router();

placeRouter.use(authMiddleware);

placeRouter.get("/", getAllPlaces);
placeRouter.post("/", createPlace);
placeRouter.put("/:id", updatePlace);
placeRouter.delete("/:id", deletePlace);

export { placeRouter };
