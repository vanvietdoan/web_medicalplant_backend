import { Request, Response } from "express";
import { GenusService } from "../services/GenusService";
import { Genus } from "../entities/Genus";

export class GenusController {
  private genusService: GenusService;

  constructor() {
    this.genusService = new GenusService();
  }

  async getAllGenera(req: Request, res: Response): Promise<void> {
    try {
      const genera = await this.genusService.getAllGenera();
      res.json(genera);
    } catch (error) {
      res.status(500).json({ message: "Error fetching genera", error });
    }
  }

  async getGenusById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const genus = await this.genusService.getGenusById(id);
      
      if (!genus) {
        res.status(404).json({ message: "Genus not found" });
        return;
      }
      
      res.json(genus);
    } catch (error) {
      res.status(500).json({ message: "Error fetching genus", error });
    }
  }

  async createGenus(req: Request, res: Response): Promise<void> {
    try {
      const genusData = req.body;
      
      // Validate input data
      const validationErrors = await this.genusService.validateGenusData(genusData);
      if (validationErrors.length > 0) {
        res.status(400).json({ message: "Validation failed", errors: validationErrors });
        return;
      }

      const genus = await this.genusService.createGenus(genusData);
      res.status(201).json(genus);
    } catch (error) {
      res.status(500).json({ message: "Error creating genus", error });
    }
  }

  async updateGenus(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const genusData = req.body;
      
      // Validate input data
      const validationErrors = await this.genusService.validateGenusData(genusData);
      if (validationErrors.length > 0) {
        res.status(400).json({ message: "Validation failed", errors: validationErrors });
        return;
      }

      const genus = await this.genusService.updateGenus(id, genusData);
      
      if (!genus) {
        res.status(404).json({ message: "Genus not found" });
        return;
      }
      
      res.json(genus);
    } catch (error) {
      res.status(500).json({ message: "Error updating genus", error });
    }
  }

  async deleteGenus(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.genusService.deleteGenus(id);
      
      if (!success) {
        res.status(404).json({ message: "Genus not found" });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting genus", error });
    }
  }

  async getGeneraByFamily(req: Request, res: Response): Promise<void> {
    try {
      const familyId = parseInt(req.params.familyId);
      const genera = await this.genusService.getGeneraByFamily(familyId);
      res.json(genera);
    } catch (error) {
      res.status(500).json({ message: "Error fetching genera by family", error });
    }
  }

  async searchGenera(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.query;
      
      if (!name || typeof name !== 'string') {
        res.status(400).json({ message: "Search name is required" });
        return;
      }

      const genera = await this.genusService.searchGenera(name);
      res.json(genera);
    } catch (error) {
      res.status(500).json({ message: "Error searching genera", error });
    }
  }
} 