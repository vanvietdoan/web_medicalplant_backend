import { Request, Response } from "express";
import { PictureRepository } from "../repositories/PictureRepository";

export class PictureController {
  private pictureRepository: PictureRepository;

  constructor() {
    this.pictureRepository = new PictureRepository();
  }

  async getAllPictures(req: Request, res: Response) {
    try {
      const pictures = await this.pictureRepository.findAll();
      res.json(pictures);
    } catch (error) {
      res.status(500).json({ message: "Error fetching pictures", error });
    }
  }

  async getPictureById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const picture = await this.pictureRepository.findById(id);
      if (!picture) {
        return res.status(404).json({ message: "Picture not found" });
      }
      res.json(picture);
    } catch (error) {
      res.status(500).json({ message: "Error fetching picture", error });
    }
  }

  async createPicture(req: Request, res: Response) {
    try {
      const picture = await this.pictureRepository.create(req.body);
      res.status(201).json(picture);
    } catch (error) {
      res.status(500).json({ message: "Error creating picture", error });
    }
  }

  async updatePicture(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const picture = await this.pictureRepository.update(id, req.body);
      if (!picture) {
        return res.status(404).json({ message: "Picture not found" });
      }
      res.json(picture);
    } catch (error) {
      res.status(500).json({ message: "Error updating picture", error });
    }
  }

  async deletePicture(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const success = await this.pictureRepository.delete(id);
      if (!success) {
        return res.status(404).json({ message: "Picture not found" });
      }
      res.json({ message: "Picture deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting picture", error });
    }
  }

  async getPicturesByPlant(req: Request, res: Response) {
    try {
      const plantId = parseInt(req.params.plantId);
      const pictures = await this.pictureRepository.findByPlant(plantId);
      res.json(pictures);
    } catch (error) {
      res.status(500).json({ message: "Error fetching pictures by plant", error });
    }
  }

  async getPicturesByDisease(req: Request, res: Response) {
    try {
      const diseaseId = parseInt(req.params.diseaseId);
      const pictures = await this.pictureRepository.findByDisease(diseaseId);
      res.json(pictures);
    } catch (error) {
      res.status(500).json({ message: "Error fetching pictures by disease", error });
    }
  }

  async searchPictures(req: Request, res: Response) {
    try {
      const { description } = req.query;
      if (!description || typeof description !== "string") {
        return res.status(400).json({ message: "Description query parameter is required" });
      }
      const pictures = await this.pictureRepository.searchByDescription(description);
      res.json(pictures);
    } catch (error) {
      res.status(500).json({ message: "Error searching pictures", error });
    }
  }
} 