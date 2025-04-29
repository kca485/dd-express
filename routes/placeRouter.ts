import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createPlace,
  deletePlace,
  getAllPlaces,
  updatePlace,
} from "../controllers/placeController";
import multer from "multer";

const placeRouter = Router();

placeRouter.use(authMiddleware);

const upload = multer({ storage: multer.memoryStorage() });

placeRouter.get("/", getAllPlaces);
placeRouter.post("/", upload.single("picture"), createPlace);
placeRouter.put("/:id", upload.single("picture"), updatePlace);
placeRouter.delete("/:id", deletePlace);

export { placeRouter };
