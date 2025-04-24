import { Request, Response } from "express";
import { Service, Inject } from "typedi";
import { AuthService } from "../services/AuthService";
import { AuthRequest } from "../middleware/auth";
import logger from "../utils/logger";

@Service()
export class AuthController {
  @Inject()
  private authService!: AuthService;

  constructor() {
    console.log('AuthController constructor called');
    setTimeout(() => {
      console.log('AuthService injected:', this.authService !== undefined);
    }, 1000);
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      logger.info(`Login attempt for email: ${req.body.email}`);
      
      // Debug check
      if (!this.authService) {
        logger.error(`AuthService is undefined in login method`);
        res.status(500).json({ message: "Server configuration error" });
        return;
      }
      
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      
      if (result) {
        logger.info(`Successful login for user: ${result.user.email}`);
        // Return token and user info
        res.json({ 
          token: result.token,
          user: {
            id: result.user.user_id,
            email: result.user.email,
            full_name: result.user.full_name,
            role: result.user.role?.name
          }
        });
      } else {
        logger.warn(`Failed login attempt for email: ${email}`);
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      if (error instanceof Error && error.message === "Account is not active") {
        logger.warn(`Login attempt for inactive account: ${req.body.email}`);
        res.status(403).json({ message: error.message });
      } else {
        logger.error(`Login error for ${req.body.email}: ${error}`);
        res.status(500).json({ message: "Error during login" });
      }
    }
  }
  
  public async logout(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      logger.info(`Logout attempt for user ID: ${userId}`);
      
      if (userId) {
        await this.authService.logout(userId);
        logger.info(`Successfully logged out user ID: ${userId}`);
      }
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      logger.error(`Logout error for user ID ${req.user?.id}: ${error}`);
      res.status(500).json({ message: "Error during logout" });
    }
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      logger.info(`Registration attempt for email: ${req.body.email}`);
      const user = await this.authService.register(req.body);
      logger.info(`Successfully registered user: ${user.email}`);
      res.status(201).json({ 
        message: "Registration successful. Please check your email to verify your account.",
        user 
      });
    } catch (error) {
      if (error instanceof Error && error.message === "User already exists") {
        logger.warn(`Registration attempt for existing user: ${req.body.email}`);
        res.status(400).json({ message: error.message });
      } else {
        logger.error(`Registration error for ${req.body.email}: ${error}`);
        res.status(500).json({ message: "Error registering user" });
      }
    }
  }

  public async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;
      logger.info(`Email verification attempt with token: ${token}`);
      const result = await this.authService.verifyEmail(token);
      if (result) {
        logger.info(`Successfully verified email for token: ${token}`);
        res.sendFile('email-verified.html', { root: './src/views' });
      } else {
        logger.warn(`Invalid verification token: ${token}`);
        res.status(400).json({ message: "Invalid or expired verification token" });
      }
    } catch (error) {
      logger.error(`Email verification error for token ${req.params.token}: ${error}`);
      res.status(500).json({ message: "Error verifying email" });
    }
  }

  public async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      logger.info(`Password reset request for email: ${email}`);
      const result = await this.authService.forgotPassword(email);
      if (result) {
        logger.info(`Password reset instructions sent to: ${email}`);
        res.json({ message: "Password reset instructions sent to your email" });
      } else {
        logger.warn(`Password reset requested for non-existent user: ${email}`);
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      logger.error(`Forgot password error for ${req.body.email}: ${error}`);
      res.status(500).json({ message: "Error processing forgot password request" });
    }
  }

  public async changePassword(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      logger.info(`Password change attempt for user ID: ${userId}`);
      
      if (!userId) {
        logger.warn('Password change attempted without user ID');
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const result = await this.authService.changePassword(userId, req.body.oldPassword, req.body.newPassword);
      if (result) {
        logger.info(`Successfully changed password for user ID: ${userId}`);
        res.json({ message: "Password changed successfully" });
      } else {
        logger.warn(`Invalid old password for user ID: ${userId}`);
        res.status(400).json({ message: "Invalid old password" });
      }
    } catch (error) {
      logger.error(`Password change error for user ID ${req.user?.id}: ${error}`);
      res.status(500).json({ message: "Error changing password" });
    }
  }
}