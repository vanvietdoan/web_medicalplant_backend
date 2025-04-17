import { Request, Response } from "express";
import { Service } from "typedi";
import { PlantDiseaseService } from "../services/PlantDiseaseService";
import { IPlantDisease } from "../interfaces/IPlantDisease";

@Service()
export class PlantDiseaseController {
  constructor(
    private plantDiseaseService: PlantDiseaseService
  ) {}

  public async getAllPlantDiseases(req: Request, res: Response): Promise<void> {
    try {
      const plantDiseases = await this.plantDiseaseService.getAllPlantDiseases();
      res.json(plantDiseases);
    } catch (error) {
      res.status(500).json({ message: "Error fetching plantDiseases", error });
    }
  }

  public async getPlantDiseaseById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const plantDisease = await this.plantDiseaseService.getPlantDiseaseById(id);
      if (!plantDisease) {
        res.status(404).json({ message: "PlantDisease not found" });
        return;
      }
      res.json(plantDisease);
    } catch (error) {
      res.status(500).json({ message: "Error fetching plantDisease", error });
    }
  }

  public async createPlantDisease(req: Request, res: Response): Promise<void> {
    try {
      const plantDisease: Partial<IPlantDisease> = req.body;
      const newPlantDisease = await this.plantDiseaseService.createPlantDisease(plantDisease);
      res.status(201).json(newPlantDisease);
    } catch (error) {
      res.status(500).json({ message: "Error creating plantDisease", error });
    }
  }

  public async updatePlantDisease(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const plantDisease: Partial<IPlantDisease> = req.body;
      const updatedPlantDisease = await this.plantDiseaseService.updatePlantDisease(id, plantDisease);
      if (!updatedPlantDisease) {
        res.status(404).json({ message: "PlantDisease not found" });
        return;
      }
      res.json(updatedPlantDisease);
    } catch (error) {
      res.status(500).json({ message: "Error updating plantDisease", error });
    }
  }

  public async deletePlantDisease(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await this.plantDiseaseService.deletePlantDisease(id);
      if (!result) {
        res.status(404).json({ message: "PlantDisease not found" });
        return;
      }
      res.json({ message: "PlantDisease deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting plantDisease", error });
    }
  }

  public async getPlantDiseasesByPlant(req: Request, res: Response): Promise<void> {
    try {
      const plantId = parseInt(req.params.plantId);
      const plantDiseases = await this.plantDiseaseService.getPlantDiseasesByPlant(plantId);
      res.json(plantDiseases);
    } catch (error) {
      res.status(500).json({ message: "Error fetching plant diseases", error });
    }
  }

  public async getPlantDiseasesByDisease(req: Request, res: Response): Promise<void> {
    try {
      const diseaseId = parseInt(req.params.diseaseId);
      const plantDiseases = await this.plantDiseaseService.getPlantDiseasesByDisease(diseaseId);
      res.json(plantDiseases);
    } catch (error) {
      res.status(500).json({ message: "Error fetching plant diseases", error });
    }
  }
} 