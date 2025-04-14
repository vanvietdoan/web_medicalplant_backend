import { Request, Response } from "express";
import { SpeciesService } from "../services/SpeciesService";
import { Species } from "../entities/Species";

export class SpeciesController {
  private speciesService: SpeciesService;

  constructor() {
    this.speciesService = new SpeciesService();
  }

  async getAllSpecies(req: Request, res: Response): Promise<void> {
    try {
      const species = await this.speciesService.getAllSpecies();
      res.json(species);
    } catch (error) {
      res.status(500).json({ message: "Error fetching species", error });
    }
  }

  async getSpeciesById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const species = await this.speciesService.getSpeciesById(id);
      
      if (!species) {
        res.status(404).json({ message: "Species not found" });
        return;
      }
      
      res.json(species);
    } catch (error) {
      res.status(500).json({ message: "Error fetching species", error });
    }
  }

  async createSpecies(req: Request, res: Response): Promise<void> {
    try {
      const speciesData = req.body;
      
      // Validate input data
      const validationErrors = await this.speciesService.validateSpeciesData(speciesData);
      if (validationErrors.length > 0) {
        res.status(400).json({ message: "Validation failed", errors: validationErrors });
        return;
      }

      const species = await this.speciesService.createSpecies(speciesData);
      res.status(201).json(species);
    } catch (error) {
      res.status(500).json({ message: "Error creating species", error });
    }
  }

  async updateSpecies(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const speciesData = req.body;
      
      // Validate input data
      const validationErrors = await this.speciesService.validateSpeciesData(speciesData);
      if (validationErrors.length > 0) {
        res.status(400).json({ message: "Validation failed", errors: validationErrors });
        return;
      }

      const species = await this.speciesService.updateSpecies(id, speciesData);
      
      if (!species) {
        res.status(404).json({ message: "Species not found" });
        return;
      }
      
      res.json(species);
    } catch (error) {
      res.status(500).json({ message: "Error updating species", error });
    }
  }

  async deleteSpecies(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.speciesService.deleteSpecies(id);
      
      if (!success) {
        res.status(404).json({ message: "Species not found" });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting species", error });
    }
  }

  async getSpeciesByGenus(req: Request, res: Response): Promise<void> {
    try {
      const genusId = parseInt(req.params.genusId);
      const species = await this.speciesService.getSpeciesByGenus(genusId);
      res.json(species);
    } catch (error) {
      res.status(500).json({ message: "Error fetching species by genus", error });
    }
  }

  async searchSpecies(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.query;
      
      if (!name || typeof name !== 'string') {
        res.status(400).json({ message: "Search name is required" });
        return;
      }

      const species = await this.speciesService.searchSpecies(name);
      res.json(species);
    } catch (error) {
      res.status(500).json({ message: "Error searching species", error });
    }
  }
} 