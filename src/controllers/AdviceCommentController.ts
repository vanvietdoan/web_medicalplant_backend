import { Request, Response } from "express";
import { AdviceCommentService } from "../services/AdviceCommentService";
import { IAdviceComment } from "../interfaces/IAdviceComment";

export class AdviceCommentController {
  private adviceCommentService: AdviceCommentService;

  constructor() {
    this.adviceCommentService = new AdviceCommentService();
  }

  async getAllAdviceComments(req: Request, res: Response) {
    try {
      const adviceComments = await this.adviceCommentService.getAllAdviceComments();
      res.json(adviceComments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching advice comments", error });
    }
  }

  async getAdviceCommentById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const adviceComment = await this.adviceCommentService.getAdviceCommentById(id);
      if (!adviceComment) {
        return res.status(404).json({ message: "Advice comment not found" });
      }
      res.json(adviceComment);
    } catch (error) {
      res.status(500).json({ message: "Error fetching advice comment", error });
    }
  }

  async getAdviceCommentsByUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const adviceComments = await this.adviceCommentService.getAdviceCommentsByUser(userId);
      res.json(adviceComments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user's advice comments", error });
    }
  }

  async getAdviceCommentsByPlant(req: Request, res: Response) {
    try {
      const plantId = parseInt(req.params.plantId);
      const adviceComments = await this.adviceCommentService.getAdviceCommentsByPlant(plantId);
      res.json(adviceComments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching plant's advice comments", error });
    }
  }

  async getAdviceCommentsByDisease(req: Request, res: Response) {
    try {
      const diseaseId = parseInt(req.params.diseaseId);
      const adviceComments = await this.adviceCommentService.getAdviceCommentsByDisease(diseaseId);
      res.json(adviceComments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching disease's advice comments", error });
    }
  }

  async createAdviceComment(req: Request, res: Response) {
    try {
      const adviceComment: Partial<IAdviceComment> = req.body;
      const newAdviceComment = await this.adviceCommentService.createAdviceComment(adviceComment);
      res.status(201).json(newAdviceComment);
    } catch (error) {
      res.status(500).json({ message: "Error creating advice comment", error });
    }
  }

  async updateAdviceComment(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const adviceComment: Partial<IAdviceComment> = req.body;
      const updatedAdviceComment = await this.adviceCommentService.updateAdviceComment(id, adviceComment);
      if (!updatedAdviceComment) {
        return res.status(404).json({ message: "Advice comment not found" });
      }
      res.json(updatedAdviceComment);
    } catch (error) {
      res.status(500).json({ message: "Error updating advice comment", error });
    }
  }

  async deleteAdviceComment(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const result = await this.adviceCommentService.deleteAdviceComment(id);
      if (!result) {
        return res.status(404).json({ message: "Advice comment not found" });
      }
      res.json({ message: "Advice comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting advice comment", error });
    }
  }

  async searchByTitle(req: Request, res: Response) {
    try {
      const title = req.query.title as string;
      const adviceComments = await this.adviceCommentService.searchByTitle(title);
      res.json(adviceComments);
    } catch (error) {
      res.status(500).json({ message: "Error searching advice comments by title", error });
    }
  }

  async searchByContent(req: Request, res: Response) {
    try {
      const content = req.query.content as string;
      const adviceComments = await this.adviceCommentService.searchByContent(content);
      res.json(adviceComments);
    } catch (error) {
      res.status(500).json({ message: "Error searching advice comments by content", error });
    }
  }
} 