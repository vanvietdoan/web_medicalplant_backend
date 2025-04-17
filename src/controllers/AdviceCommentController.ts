import { Request, Response } from "express";
import { Service } from "typedi";
import { AdviceCommentService } from "../services/AdviceCommentService";
import { IAdviceComment } from "../interfaces/IAdviceComment";

@Service()
export class AdviceCommentController {
  constructor(
    private adviceCommentService: AdviceCommentService
  ) {}


  public async getAllAdviceComments(req: Request, res: Response): Promise<void> {
    try {
      const adviceComments = await this.adviceCommentService.getAllAdviceComments();
      res.json(adviceComments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching advice comments", error }); return;
    }
  }

  public async getAdviceCommentById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const adviceComment = await this.adviceCommentService.getAdviceCommentById(id);
      if (!adviceComment) {
        res.status(404).json({ message: "Advice comment not found" }); return;
      }
      res.json(adviceComment);
    } catch (error) {
      res.status(500).json({ message: "Error fetching advice comment", error }); return;
    }
  }

  public async getAdviceCommentsByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const adviceComments = await this.adviceCommentService.getAdviceCommentsByUser(userId);
      res.json(adviceComments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user's advice comments", error }); return;
    }
  }

  public async getAdviceCommentsByPlant(req: Request, res: Response): Promise<void> {
    try {
      const plantId = parseInt(req.params.plantId);
      const adviceComments = await this.adviceCommentService.getAdviceCommentsByPlant(plantId);
      res.json(adviceComments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching plant's advice comments", error }); return;
    }
  }

  public async getAdviceCommentsByDisease(req: Request, res: Response): Promise<void> {
    try {
      const diseaseId = parseInt(req.params.diseaseId);
      const adviceComments = await this.adviceCommentService.getAdviceCommentsByDisease(diseaseId);
      res.json(adviceComments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching disease's advice comments", error }); return;
    }
  }

  public async createAdviceComment(req: Request, res: Response): Promise<void> {
    try {
      const adviceComment: Partial<IAdviceComment> = req.body;
      const newAdviceComment = await this.adviceCommentService.createAdviceComment(adviceComment);
      res.status(201).json(newAdviceComment); return;
    } catch (error) {
      res.status(500).json({ message: "Error creating advice comment", error }); return;
    }
  }

  public async updateAdviceComment(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const adviceComment: Partial<IAdviceComment> = req.body;
      const updatedAdviceComment = await this.adviceCommentService.updateAdviceComment(id, adviceComment);
      if (!updatedAdviceComment) {
        res.status(404).json({ message: "Advice comment not found" }); return;
      }
      res.json(updatedAdviceComment);
    } catch (error) {
      res.status(500).json({ message: "Error updating advice comment", error }); return;
    }
  }

  public async deleteAdviceComment(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await this.adviceCommentService.deleteAdviceComment(id);
      if (!result) {
        res.status(404).json({ message: "Advice comment not found" }); return;
      }
      res.json({ message: "Advice comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting advice comment", error }); return;
    }
  }

  public async searchByTitle(req: Request, res: Response): Promise<void> {
    try {
      const title = req.query.title as string;
      const adviceComments = await this.adviceCommentService.searchByTitle(title);
      res.json(adviceComments);
    } catch (error) {
      res.status(500).json({ message: "Error searching advice comments by title", error }); return;
    }
  }

  public async searchByContent(req: Request, res: Response): Promise<void> {
    try {
      const content = req.query.content as string;
      const adviceComments = await this.adviceCommentService.searchByContent(content);
      res.json(adviceComments);
    } catch (error) {
      res.status(500).json({ message: "Error searching advice comments by content", error }); return;
    }
  }
} 