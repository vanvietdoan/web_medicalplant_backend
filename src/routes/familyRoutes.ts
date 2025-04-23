import { Router } from "express";
import { Container } from "typedi";
import { FamilyController } from "../controllers/FamilyController";
import { auth } from "../middleware/auth";

const router = Router();
const familyController = Container.get(FamilyController);

// Public routes
router.get("/", familyController.getAllFamilies.bind(familyController));
router.get("/:id", familyController.getFamilyById.bind(familyController));

// Protected routes
router.post("/", auth, familyController.createFamily.bind(familyController));
router.put("/:id", auth, familyController.updateFamily.bind(familyController));
router.delete("/:id", auth, familyController.deleteFamily.bind(familyController));

export default router; 