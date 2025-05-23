import { Router } from "express";
import { Container } from "typedi";
import { PlantController } from "../controllers/PlantController";
import { auth } from "../middleware/auth";

const router = Router();
const plantController = Container.get(PlantController);

// Public routes
router.get("/", plantController.getAllPlants.bind(plantController));
router.get("/new-plants", plantController.getNewPlants.bind(plantController));
router.get("/filter-plant", plantController.filterPlants.bind(plantController));
router.get("/multiple-benefits", plantController.getMultipleBenefits.bind(plantController));
router.get("/:id", plantController.getPlantById.bind(plantController));

// Protected routes
router.post("/", auth, plantController.createPlant.bind(plantController));
router.put("/:id", auth, plantController.updatePlant.bind(plantController));
router.delete("/:id", auth, plantController.deletePlant.bind(plantController));

export default router;