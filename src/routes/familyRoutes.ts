import { Router } from "express";
import { Container } from "typedi";
import { FamilyController } from "../controllers/FamilyController";
import { auth } from "../middleware/auth";

const router = Router();
const familyController = Container.get(FamilyController);

// Public routes
router.get("/", familyController.getAllFamilies);
router.get("/:id", familyController.getFamilyById);

// Protected routes
router.post("/", auth, familyController.createFamily);
router.put("/:id", auth, familyController.updateFamily);
router.delete("/:id", auth, familyController.deleteFamily);

export default router; 