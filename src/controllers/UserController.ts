import { Request, Response } from "express";
import logger from "../utils/logger";
import { UserService } from "../services/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    logger.info("Fetching all users...");
    try {
      const users = await this.userService.getAllUsers();
      logger.info(`Fetched ${users.length} users successfully.`);
      res.json(users);
    } catch (error) {
      logger.error("Error fetching users:", error);
      res.status(500).json({ message: "Error fetching users" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    logger.info(`Fetching user with ID: ${id}`);
    try {
      const user = await this.userService.getUserById(id);
      if (user) {
        logger.info(`User with ID: ${id} fetched successfully.`);
        res.json(user);
      } else {
        logger.warn(`User with ID: ${id} not found.`);
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      logger.error(`Error fetching user with ID: ${id}`, error);
      res.status(500).json({ message: "Error fetching user" });
    }
  }

async createUser(req: Request, res: Response): Promise<void> {
  logger.info("Creating a new user...");
  try {
    const { email, username } = req.body;

    // Validate required fields
    if (!email) {
      res.status(400).json({ message: "Email are required" });
      return;
    }

    // Check if the email already exists
    const existingUser = await this.userService.getUserByEmail(email);
    if (existingUser) {
      logger.warn(`User with email ${email} already exists`);
      res.status(409).json({ message: "User with this email already exists" });
      return;
    }

    const user = await this.userService.createUser(req.body);
    logger.info(`User created successfully with email: ${email}`);
    res.status(201).json(user);
  } catch (error) {
    logger.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
}

  async updateUser(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    logger.info(`Updating user with ID: ${id}`);
    try {
      const user = await this.userService.updateUser(id, req.body);
      if (user) {
        logger.info(`User with ID: ${id} updated successfully.`);
        res.json(user);
      } else {
        logger.warn(`User with ID: ${id} not found.`);
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      logger.error(`Error updating user with ID: ${id}`, error);
      res.status(500).json({ message: "Error updating user" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    logger.info(`Deleting user with ID: ${id}`);
    try {
      const result = await this.userService.deleteUser(id);
      if (result) {
        logger.info(`User with ID: ${id} deleted successfully.`);
        res.status(204).send();
      } else {
        logger.warn(`User with ID: ${id} not found.`);
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      logger.error(`Error deleting user with ID: ${id}`, error);
      res.status(500).json({ message: "Error deleting user" });
    }
  }
}