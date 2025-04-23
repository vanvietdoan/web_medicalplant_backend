import { Request, Response } from "express";
import { Service } from "typedi";
import { UserService } from "../services/UserService";

@Service()
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.getUserById(id);
      
      if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }
      
      res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.updateUser(id, req.body);
      
      if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }
      
      res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const success = await this.userService.deleteUser(id);
      
      if (!success) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }
      
      res.status(200).json({ success: true, message: "User deleted" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}