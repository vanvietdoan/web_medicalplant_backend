import { Request, Response } from "express";
import { DiseaseService } from "../services/DiseaseService";
import { IDisease } from "../interfaces/IDisease";

export class DiseaseController {
  private diseaseService: DiseaseService;

  constructor() {
    this.diseaseService = new DiseaseService();
  }

  async getAllDiseases(req: Request, res: Response) {
    try {
      const diseases = await this.diseaseService.getAllDiseases();
      res.json(diseases);
    } catch (error) {
      res.status(500).json({ message: "Error fetching diseases", error });
    }
  }

  async getDiseaseById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const disease = await this.diseaseService.getDiseaseById(id);
      if (!disease) {
        return res.status(404).json({ message: "Disease not found" });
      }
      res.json(disease);
    } catch (error) {
      res.status(500).json({ message: "Error fetching disease", error });
    }
  }

  async createDisease(req: Request, res: Response) {
    try {
      const disease: Partial<IDisease> = req.body;
      const newDisease = await this.diseaseService.createDisease(disease);
      res.status(201).json(newDisease);
    } catch (error) {
      res.status(500).json({ message: "Error creating disease", error });
    }
  }

  async updateDisease(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const disease: Partial<IDisease> = req.body;
      const updatedDisease = await this.diseaseService.updateDisease(id, disease);
      if (!updatedDisease) {
        return res.status(404).json({ message: "Disease not found" });
      }
      res.json(updatedDisease);
    } catch (error) {
      res.status(500).json({ message: "Error updating disease", error });
    }
  }

  async deleteDisease(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const result = await this.diseaseService.deleteDisease(id);
      if (!result) {
        return res.status(404).json({ message: "Disease not found" });
      }
      res.json({ message: "Disease deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting disease", error });
    }
  }

  async searchByName(req: Request, res: Response) {
    try {
      const name = req.query.name as string;
      const diseases = await this.diseaseService.searchByName(name);
      res.json(diseases);
    } catch (error) {
      res.status(500).json({ message: "Error searching diseases by name", error });
    }
  }

  async searchBySymptoms(req: Request, res: Response) {
    try {
      const symptoms = req.query.symptoms as string;
      const diseases = await this.diseaseService.searchBySymptoms(symptoms);
      res.json(diseases);
    } catch (error) {
      res.status(500).json({ message: "Error searching diseases by symptoms", error });
    }
  }
} 