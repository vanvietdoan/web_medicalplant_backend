import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middleware/auth";

const router = Router();
const userController = new UserController();

// All routes are protected
router.get("/", auth, userController.getAllUsers.bind(userController));
router.get("/:id", auth, userController.getUserById.bind(userController));
router.post("/", auth, userController.createUser.bind(userController));
router.put("/:id", auth, userController.updateUser.bind(userController));
router.delete("/:id", auth, userController.deleteUser.bind(userController));

export default router; 