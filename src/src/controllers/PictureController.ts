import { Request, Response } from "express";
import { Service } from "typedi";
import { PictureRepository } from "../repositories/PictureRepository";

@Service()
export class PictureController {
  constructor(
    private pictureRepository: PictureRepository
  ) {}


  public async getAllPictures(req: Request, res: Response): Promise<void> {
    try {
      const pictures = await this.pictureRepository.findAll();
      res.json(pictures);
    } catch (error) {
      res.status(500).json({ message: "Error fetching pictures", error }); return;
    }
  }

  public async getPictureById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const picture = await this.pictureRepository.findById(id);
      if (!picture) {
        res.status(404).json({ message: "Picture not found" }); return;
      }
      res.json(picture);
    } catch (error) {
      res.status(500).json({ message: "Error fetching picture", error }); return;
    }
  }

  public async createPicture(req: Request, res: Response): Promise<void> {
    try {
      const picture = await this.pictureRepository.create(req.body);
      res.status(201).json(picture); return;
    } catch (error) {
      res.status(500).json({ message: "Error creating picture", error }); return;
    }
  }

  public async updatePicture(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const picture = await this.pictureRepository.update(id, req.body);
      if (!picture) {
        res.status(404).json({ message: "Picture not found" }); return;
      }
      res.json(picture);
    } catch (error) {
      res.status(500).json({ message: "Error updating picture", error }); return;
    }
  }

  public async deletePicture(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.pictureRepository.delete(id);
      if (!success) {
        res.status(404).json({ message: "Picture not found" }); return;
      }
      res.json({ message: "Picture deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting picture", error }); return;
    }
  }

  public async getPicturesByPlant(req: Request, res: Response): Promise<void> {
    try {
      const plantId = parseInt(req.params.plantId);
      const pictures = await this.pictureRepository.findByPlant(plantId);
      res.json(pictures);
    } catch (error) {
      res.status(500).json({ message: "Error fetching pictures by plant", error }); return;
    }
  }

  public async getPicturesByDisease(req: Request, res: Response): Promise<void> {
    try {
      const diseaseId = parseInt(req.params.diseaseId);
      const pictures = await this.pictureRepository.findByDisease(diseaseId);
      res.json(pictures);
    } catch (error) {
      res.status(500).json({ message: "Error fetching pictures by disease", error }); return;
    }
  }

  public async searchPictures(req: Request, res: Response): Promise<void> {
    try {
      const { description } = req.query;
      if (!description || typeof description !== "string") {
        res.status(400).json({ message: "Description query parameter is required" }); return;
      }
      const pictures = await this.pictureRepository.searchByDescription(description);
      res.json(pictures);
    } catch (error) {
      res.status(500).json({ message: "Error searching pictures", error }); return;
    }
  }
} 