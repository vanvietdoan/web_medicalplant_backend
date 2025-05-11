import { Router } from "express";
import { Container } from "typedi";
import { EvalueController } from "../controllers/EvaludeController";
import { auth } from "../middleware/auth";

const router = Router();
const evalueController = Container.get(EvalueController);

// public
router.get("/", evalueController.getEvalues.bind(evalueController));
router.get("/:id", evalueController.getEvalueById.bind(evalueController));
router.get("/advice/:id", evalueController.getEvalueByAdviceId.bind(evalueController));
router.get("/user/:id", evalueController.getEvalueByUserId.bind(evalueController));
// Create new user
router.post("/", auth, evalueController.createEvalue.bind(evalueController));

// Update user
router.put("/:id", auth, evalueController.updateEvalue.bind(evalueController));

// Delete user
router.delete("/:id", auth, evalueController.deleteEvalue.bind(evalueController));

export default router; 