import { Request, Response } from "express";
import { PlantDiseaseService } from "../services/PlantDiseaseService";
import { IPlantDisease } from "../interfaces/IPlantDisease";

export class PlantDiseaseController {
  private medicalPlantDiseaseService: PlantDiseaseService;

  constructor() {
    this.medicalPlantDiseaseService = new PlantDiseaseService();
  }

  async getAllPlantDiseases(req: Request, res: Response) {
    try {
      const plantDiseases = await this.medicalPlantDiseaseService.getAllPlantDiseases();
      res.json(plantDiseases);
    } catch (error) {
      res.status(500).json({ message: "Error fetching plantDiseases", error });
    }
  }

  async getPlantDiseaseById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const plantDisease = await this.medicalPlantDiseaseService.getPlantDiseaseById(id);
      if (!plantDisease) {
        return res.status(404).json({ message: "PlantDisease not found" });
      }
      res.json(plantDisease);
    } catch (error) {
      res.status(500).json({ message: "Error fetching plantDisease", error });
    }
  }

  async createPlantDisease(req: Request, res: Response) {
    try {
      const plantDisease: Partial<IPlantDisease> = req.body;
      const newPlantDisease = await this.medicalPlantDiseaseService.createPlantDisease(plantDisease);
      res.status(201).json(newPlantDisease);
    } catch (error) {
      res.status(500).json({ message: "Error creating plantDisease", error });
    }
  }

  async updatePlantDisease(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const plantDisease: Partial<IPlantDisease> = req.body;
      const updatedPlantDisease = await this.medicalPlantDiseaseService.updatePlantDisease(id, plantDisease);
      if (!updatedPlantDisease) {
        return res.status(404).json({ message: "PlantDisease not found" });
      }
      res.json(updatedPlantDisease);
    } catch (error) {
      res.status(500).json({ message: "Error updating plantDisease", error });
    }
  }

  async deletePlantDisease(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const result = await this.medicalPlantDiseaseService.deletePlantDisease(id);
      if (!result) {
        return res.status(404).json({ message: "PlantDisease not found" });
      }
      res.json({ message: "PlantDisease deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting plantDisease", error });
    }
  }
} 