import { Router } from "express";
import { Container } from "typedi";
import { AdviceCommentController } from "../controllers/AdviceCommentController";
import { auth } from "../middleware/auth";

const router = Router();
const adviceCommentController = Container.get(AdviceCommentController);

// Public routes
router.get("/", adviceCommentController.getAllAdviceComments);
router.get("/:id", adviceCommentController.getAdviceCommentById);
router.get("/user/:userId", adviceCommentController.getAdviceCommentsByUser.bind(adviceCommentController));
router.get("/plant/:plantId", adviceCommentController.getAdviceCommentsByPlant.bind(adviceCommentController));
router.get("/disease/:diseaseId", adviceCommentController.getAdviceCommentsByDisease.bind(adviceCommentController));

// Protected routes
router.post("/", auth, adviceCommentController.createAdviceComment);
router.put("/:id", auth, adviceCommentController.updateAdviceComment);
router.delete("/:id", auth, adviceCommentController.deleteAdviceComment);

// Search routes
router.get("/search/title", adviceCommentController.searchByTitle.bind(adviceCommentController));
router.get("/search/content", adviceCommentController.searchByContent.bind(adviceCommentController));

export default router; 