import { Router } from "express";
import { GenusController } from "../controllers/GenusController";
import { auth } from "../middleware/auth";

const router = Router();
const genusController = new GenusController();

// Public routes
router.get("/", genusController.getAllGenera);
router.get("/:id", genusController.getGenusById);
router.get("/family/:familyId", genusController.getGeneraByFamily.bind(genusController));

// Protected routes
router.post("/", auth, genusController.createGenus);
router.put("/:id", auth, genusController.updateGenus);
router.delete("/:id", auth, genusController.deleteGenus);

export default router; 