import { Router } from "express";
import { Container } from "typedi";
import { PlantController } from "../controllers/PlantController";
import { auth } from "../middleware/auth";

const router = Router();
const plantController = Container.get(PlantController);

// Search routes
router.get('/filter-plant', plantController.filterPlants);
// Public routes
router.get("/", plantController.getAllPlants);
router.get("/:id", plantController.getPlantById);

// Protected routes
router.post("/", auth, plantController.createPlant);
router.put("/:id", auth, plantController.updatePlant);
router.delete("/:id", auth, plantController.deletePlant);

export default router;