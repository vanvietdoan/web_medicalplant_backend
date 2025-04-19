import { Router } from "express";
import { Container } from "typedi";
import { UserController } from "../controllers/UserController";
import { auth } from "../middleware/auth";

const router = Router();
const userController = Container.get(UserController);

// Get all users
router.get("/", auth, userController.getUsers.bind(userController));

// Get user by id
router.get("/:id", auth, userController.getUserById.bind(userController));

// Create new user
router.post("/", auth, userController.createUser.bind(userController));

// Update user
router.put("/:id", auth, userController.updateUser.bind(userController));

// Delete user
router.delete("/:id", auth, userController.deleteUser.bind(userController));

export default router; 