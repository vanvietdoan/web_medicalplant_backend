import { Request, Response } from "express";
import { Service } from "typedi";
import { NotifyService } from "../services/NotifyService";

@Service()
export class NotifyController {
  constructor(
    private notifyService: NotifyService
  ) {}


  async createNotify(req: Request, res: Response): Promise<void> {
    try {
      const notifyData = req.body;
      
      const notify = await this.notifyService.createNotify(notifyData);
      res.status(201).json(notify); return;
    } catch (error) {
      res.status(500).json({ message: "Error creating notify", error }); return;
    }
  }

  async updateNotify(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const notifyData = req.body;
      
      const notify = await this.notifyService.updateNotify(id, notifyData);
      
      if (!notify) {
        res.status(404).json({ message: "Notify not found" }); return;
        return;
      }
      
      res.json(notify);
    } catch (error) {
      res.status(500).json({ message: "Error updating notify", error }); return;
    }
  }

  async deleteNotify(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.notifyService.deleteNotify(id);
      
      if (!success) {
        res.status(404).json({ message: "Notify not found" }); return;
        return;
      }
      
      res.status(204).send(); return;
    } catch (error) {
      res.status(500).json({ message: "Error deleting notify", error }); return;
    }
  }

  async getNotifyByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const notify = await this.notifyService.getNotifyByUserId(userId);
      res.json(notify);
    } catch (error) {
      res.status(500).json({ message: "Error fetching notify by user id", error }); return;
    }
  }

  
} 