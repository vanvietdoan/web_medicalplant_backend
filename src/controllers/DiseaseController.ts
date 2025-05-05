import { Request, Response } from "express";
import { Service } from "typedi";
import { DiseaseService } from "../services/DiseaseService";
import { IDisease } from "../interfaces/IDisease";
import logger from "../utils/logger";

@Service()
export class DiseaseController {
  constructor(
    private diseaseService: DiseaseService
  ) {}

  private setHost(req: Request) {
    const host = `${req.protocol}://${req.get('host')}`;
    logger.info(`Setting host in DiseaseController: ${host}`);
    this.diseaseService.setHost(host);
  }

  public async getAllDiseases(req: Request, res: Response): Promise<void> {
    try {
      logger.info('Controller getAllDiseases');
      this.setHost(req);
      const diseases = await this.diseaseService.getAllDiseases();
      res.json(diseases);
    } catch (error) {
      res.status(500).json({ message: "Error fetching diseases", error });
    }
  }

  public async getDiseaseById(req: Request, res: Response): Promise<void> {
    try {
      this.setHost(req);
      const id = parseInt(req.params.id);
      const disease = await this.diseaseService.getDiseaseById(id);
      if (!disease) {
        res.status(404).json({ message: "Disease not found" });
        return;
      }
      res.json(disease);
    } catch (error) {
      res.status(500).json({ message: "Error fetching disease", error });
    }
  }

  public async createDisease(req: Request, res: Response): Promise<void> {
    try {
      this.setHost(req);
      const disease: Partial<IDisease> = req.body;
      const newDisease = await this.diseaseService.createDisease(disease);
      res.status(201).json(newDisease);
    } catch (error) {
      res.status(500).json({ message: "Error creating disease", error });
    }
  }

  public async updateDisease(req: Request, res: Response): Promise<void> {
    try {
      this.setHost(req);
      const id = parseInt(req.params.id);
      const disease: Partial<IDisease> = req.body;
      const updatedDisease = await this.diseaseService.updateDisease(id, disease);
      if (!updatedDisease) {
        res.status(404).json({ message: "Disease not found" });
        return;
      }
      res.json(updatedDisease);
    } catch (error) {
      res.status(500).json({ message: "Error updating disease", error });
    }
  }

  public async deleteDisease(req: Request, res: Response): Promise<void> {
    try {
      this.setHost(req);
      const id = parseInt(req.params.id);
      const result = await this.diseaseService.deleteDisease(id);
      if (!result) {
        res.status(404).json({ message: "Disease not found" });
        return;
      }
      res.json({ message: "Disease deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting disease", error });
    }
  }

  public async searchByName(req: Request, res: Response): Promise<void> {
    try {
      this.setHost(req);
      const name = req.query.name as string;
      const diseases = await this.diseaseService.searchByName(name);
      res.json(diseases);
    } catch (error) {
      res.status(500).json({ message: "Error searching diseases by name", error });
    }
  }

  public async searchBySymptoms(req: Request, res: Response): Promise<void> {
    try {
      this.setHost(req);
      const symptoms = req.query.symptoms as string;
      const diseases = await this.diseaseService.searchBySymptoms(symptoms);
      res.json(diseases);
    } catch (error) {
      res.status(500).json({ message: "Error searching diseases by symptoms", error });
    }
  }
} 