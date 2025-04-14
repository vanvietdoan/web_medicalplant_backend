import { Router } from "express";
import { PictureController } from "../controllers/PictureController";
import { auth } from "../middleware/auth";

const router = Router();
const pictureController = new PictureController();

// Public routes
router.get("/", pictureController.getAllPictures);
router.get("/:id", pictureController.getPictureById);
router.get("/plant/:plantId", pictureController.getPicturesByPlant);
router.get("/disease/:diseaseId", pictureController.getPicturesByDisease);
router.get("/search", pictureController.searchPictures);

// Protected routes
router.post("/", auth, pictureController.createPicture);
router.put("/:id", auth, pictureController.updatePicture);
router.delete("/:id", auth, pictureController.deletePicture);

export default router; 