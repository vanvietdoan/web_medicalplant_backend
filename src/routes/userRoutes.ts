import { Router } from "express";
import { Container } from "typedi";
import { UserController } from "../controllers/UserController";
import { auth } from "../middleware/auth";

const router = Router();
const userController = Container.get(UserController);

// public
router.get("/", userController.getUsers.bind(userController));
router.get("/:id", userController.getUserById.bind(userController));
    
// Create new user
router.post("/", auth, userController.createUser.bind(userController));

// Update user
router.put("/:id", auth, userController.updateUser.bind(userController));

// Delete user
router.delete("/:id", auth, userController.deleteUser.bind(userController));

export default router; 