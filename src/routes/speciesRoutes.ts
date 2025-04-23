import { Router } from "express";
import { Container } from "typedi";
import { SpeciesController } from "../controllers/SpeciesController";
import { auth } from "../middleware/auth";

const router = Router();
const speciesController = Container.get(SpeciesController);

// Public routes
router.get("/", speciesController.getAllSpecies.bind(speciesController));
router.get("/:id", speciesController.getSpeciesById.bind(speciesController));
router.get("/genus/:genusId", speciesController.getSpeciesByGenus.bind(speciesController));

// Protected routes
router.post("/", auth, speciesController.createSpecies.bind(speciesController));
router.put("/:id", auth, speciesController.updateSpecies.bind(speciesController));
router.delete("/:id", auth, speciesController.deleteSpecies.bind(speciesController));

export default router; 