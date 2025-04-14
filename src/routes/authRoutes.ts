import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { auth } from "../middleware/auth";

const router = Router();
const authController = new AuthController();

// Public routes
router.post("/login", authController.login.bind(authController));
router.get("/logout", authController.logout.bind(authController))
router.post("/register", authController.register.bind(authController));
router.get("/verify-email/:token", authController.verifyEmail.bind(authController));
router.post("/forgot-password", authController.forgotPassword.bind(authController));

// Protected routes
router.post("/change-password", auth, authController.changePassword.bind(authController));

export default router; 