import { Router } from "express";
import { Container } from "typedi";
import { DiseaseController } from "../controllers/DiseaseController";
import { auth } from "../middleware/auth";

const router = Router();
const diseaseController = Container.get(DiseaseController);

// Public routes
router.get("/", diseaseController.getAllDiseases.bind(diseaseController));
router.get("/:id", diseaseController.getDiseaseById);

// Protected routes
router.post("/", auth, diseaseController.createDisease);
router.put("/:id", auth, diseaseController.updateDisease);
router.delete("/:id", auth, diseaseController.deleteDisease);

// Search routes
router.get("/search/name", diseaseController.searchByName);
router.get("/search/symptoms", diseaseController.searchBySymptoms);

export default router; 