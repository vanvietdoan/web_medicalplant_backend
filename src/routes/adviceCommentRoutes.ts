import { Router } from "express";
import { Container } from "typedi";
import { AdviceCommentController } from "../controllers/AdviceCommentController";
import { auth } from "../middleware/auth";

const router = Router();
const adviceCommentController = Container.get(AdviceCommentController);

// Public routes
router.get("/user/:userId", adviceCommentController.getAdviceCommentsByUser.bind(adviceCommentController));
router.get("/plant/:plantId", adviceCommentController.getAdviceCommentsByPlant.bind(adviceCommentController));
router.get("/disease/:diseaseId", adviceCommentController.getAdviceCommentsByDisease.bind(adviceCommentController));

// Protected routes
router.post("/", auth, adviceCommentController.createAdviceComment.bind(adviceCommentController));
router.put("/:id", auth, adviceCommentController.updateAdviceComment.bind(adviceCommentController));
router.delete("/:id", auth, adviceCommentController.deleteAdviceComment.bind(adviceCommentController));

// Search routes
router.get("/search/title", adviceCommentController.searchByTitle.bind(adviceCommentController));
router.get("/search/content", adviceCommentController.searchByContent.bind(adviceCommentController));

// Public routes
router.get("/", adviceCommentController.getAllAdviceComments.bind(adviceCommentController));
router.get("/:id", adviceCommentController.getAdviceCommentById.bind(adviceCommentController));

export default router; 