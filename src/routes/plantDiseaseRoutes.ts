import { Router } from "express";
import { PlantDiseaseController } from "../controllers/PlantDiseaseController";
import { auth } from "../middleware/auth";

const router = Router();
const plantDiseaseController = new PlantDiseaseController();

// Public routes
router.get("/", plantDiseaseController.getAllPlantDiseases);
router.get("/:id", plantDiseaseController.getPlantDiseaseById);

// Protected routes
router.post("/", auth, plantDiseaseController.createPlantDisease);
router.put("/:id", auth, plantDiseaseController.updatePlantDisease);
router.delete("/:id", auth, plantDiseaseController.deletePlantDisease);

export default router; 