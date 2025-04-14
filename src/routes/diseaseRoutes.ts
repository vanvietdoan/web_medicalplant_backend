import { Router } from "express";
import { DiseaseController } from "../controllers/DiseaseController";
import { auth } from "../middleware/auth";

const router = Router();
const diseaseController = new DiseaseController();

// Public routes
router.get("/", diseaseController.getAllDiseases);
router.get("/:id", diseaseController.getDiseaseById);

// Protected routes
router.post("/", auth, diseaseController.createDisease);
router.put("/:id", auth, diseaseController.updateDisease);
router.delete("/:id", auth, diseaseController.deleteDisease);

// Search routes
router.get("/search/name", diseaseController.searchByName.bind(diseaseController));
router.get("/search/symptoms", diseaseController.searchBySymptoms.bind(diseaseController));

export default router; 