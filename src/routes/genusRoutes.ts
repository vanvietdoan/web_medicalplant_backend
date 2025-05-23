import { Router } from "express";
import { Container } from "typedi";
import { GenusController } from "../controllers/GenusController";
import { auth } from "../middleware/auth";

const router = Router();
const genusController = Container.get(GenusController);

// Public routes
router.get("/", genusController.getAllGenera.bind(genusController));
router.get("/:id", genusController.getGenusById.bind(genusController));
router.get("/family/:familyId", genusController.getGeneraByFamily.bind(genusController));

// Protected routes
router.post("/", auth, genusController.createGenus.bind(genusController));
router.put("/:id", auth, genusController.updateGenus.bind(genusController));
router.delete("/:id", auth, genusController.deleteGenus.bind(genusController));

export default router; 