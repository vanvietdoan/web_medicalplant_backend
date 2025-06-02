import { Router } from "express";
import { Container } from "typedi";
import { auth } from "../middleware/auth";
import { NotifyController } from "../controllers/NotifyController";

const router = Router();
const notifyController = Container.get(NotifyController);

router.get("/:userId", notifyController.getNotifyByUserId.bind(notifyController));

// Protected routes
router.post("/", notifyController.createNotify.bind(notifyController));
router.put("/update/:id", notifyController.updateNotify.bind(notifyController));
router.delete("/:id", auth, notifyController.deleteNotify.bind(notifyController));

export default router; 