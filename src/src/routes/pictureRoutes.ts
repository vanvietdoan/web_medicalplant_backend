import { Router } from "express";
import { Container } from "typedi";
import { PictureController } from "../controllers/PictureController";
import { auth } from "../middleware/auth";

const router = Router();
const pictureController = Container.get(PictureController);

// Public routes
router.get("/", pictureController.getAllPictures.bind(pictureController));
router.get("/:id", pictureController.getPictureById.bind(pictureController));
router.get("/plant/:plantId", pictureController.getPicturesByPlant.bind(pictureController));
router.get("/disease/:diseaseId", pictureController.getPicturesByDisease.bind(pictureController));
router.get("/search", pictureController.searchPictures.bind(pictureController));

// Protected routes
router.post("/", pictureController.createPicture.bind(pictureController));
router.put("/:id", pictureController.updatePicture.bind(pictureController));
router.delete("/:id", pictureController.deletePicture.bind(pictureController));

export default router; 