import { Router } from "express";
import { Container } from "typedi";
import { DiseaseController } from "../controllers/DiseaseController";
import { auth } from "../middleware/auth";

const router = Router();
const diseaseController = Container.get(DiseaseController);

// Public routes
router.get("/", diseaseController.getAllDiseases.bind(diseaseController));
router.get("/:id", diseaseController.getDiseaseById.bind(diseaseController));

// Protected routes
router.post("/", auth, diseaseController.createDisease.bind(diseaseController));
router.put("/:id", auth, diseaseController.updateDisease.bind(diseaseController));
router.delete("/:id", auth, diseaseController.deleteDisease.bind(diseaseController));

// Search routes
router.get("/search/name", diseaseController.searchByName);
router.get("/search/symptoms", diseaseController.searchBySymptoms);

export default router; 