import { Router } from "express";
import { Container } from "typedi";
import { PlantDiseaseController } from "../controllers/PlantDiseaseController";
import { auth } from "../middleware/auth";

const router = Router();
const plantDiseaseController = Container.get(PlantDiseaseController);

// Public routes
router.get("/", plantDiseaseController.getAllPlantDiseases);
router.get("/:id", plantDiseaseController.getPlantDiseaseById);
router.get("/plant/:plantId", plantDiseaseController.getPlantDiseasesByPlant);
router.get("/disease/:diseaseId", plantDiseaseController.getPlantDiseasesByDisease);

// Protected routes
router.post("/", auth, plantDiseaseController.createPlantDisease);
router.put("/:id", auth, plantDiseaseController.updatePlantDisease);
router.delete("/:id", auth, plantDiseaseController.deletePlantDisease);

export default router; 