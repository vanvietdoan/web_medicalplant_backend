import { Router } from "express";
import { Container } from "typedi";
import { AuthController } from "../controllers/AuthController";
import { auth } from "../middleware/auth";

const router = Router();
const authController = Container.get(AuthController);

// Kiểm tra authController để debug
console.log("AuthController instance:", authController);
console.log("AuthController methods:", Object.keys(authController));

// Public routes - bind các phương thức để đảm bảo context this
router.post("/login", authController.login.bind(authController));
router.get("/logout", auth, authController.logout.bind(authController));
router.post("/register", authController.register.bind(authController));
router.get("/verify-email/:token", authController.verifyEmail.bind(authController));
router.post("/forgot-password", authController.forgotPassword.bind(authController));

// Protected routes
router.post("/change-password", auth, authController.changePassword.bind(authController));

export default router; 