import { Router } from "express";
import { Container } from "typedi";
import { UserController } from "../controllers/UserController";
import { auth } from "../middleware/auth";

const router = Router();
const userController = Container.get(UserController);

// Get all users
router.get("/", auth, userController.getUsers);

// Get user by id
router.get("/:id", auth, userController.getUserById);

// Create new user
router.post("/", auth, userController.createUser);

// Update user
router.put("/:id", auth, userController.updateUser);

// Delete user
router.delete("/:id", auth, userController.deleteUser);

export default router; 