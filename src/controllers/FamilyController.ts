import { Request, Response } from "express";
import { Service } from "typedi";
import { FamilyService } from "../services/FamilyService";
import { Family } from "../entities/Family";

@Service()
export class FamilyController {
  constructor(
    private familyService: FamilyService
  ) {}


  async getAllFamilies(req: Request, res: Response): Promise<void> {
    try {
      const families = await this.familyService.getAllFamilies();
      res.json(families);
    } catch (error) {
      res.status(500).json({ message: "Error fetching families", error }); return;
    }
  }

  async getFamilyById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const family = await this.familyService.getFamilyById(id);
      
      if (!family) {
        res.status(404).json({ message: "Family not found" }); return;
        return;
      }
      
      res.json(family);
    } catch (error) {
      res.status(500).json({ message: "Error fetching family", error }); return;
    }
  }

  async createFamily(req: Request, res: Response): Promise<void> {
    try {
      const familyData = req.body;
      
      // Validate input data
      const validationErrors = await this.familyService.validateFamilyData(familyData);
      if (validationErrors.length > 0) {
        res.status(400).json({ message: "Validation failed", errors: validationErrors }); return;
        return;
      }

      const family = await this.familyService.createFamily(familyData);
      res.status(201).json(family); return;
    } catch (error) {
      res.status(500).json({ message: "Error creating family", error }); return;
    }
  }

  async updateFamily(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const familyData = req.body;
      
      // Validate input data
      const validationErrors = await this.familyService.validateFamilyData(familyData);
      if (validationErrors.length > 0) {
        res.status(400).json({ message: "Validation failed", errors: validationErrors }); return;
        return;
      }

      const family = await this.familyService.updateFamily(id, familyData);
      
      if (!family) {
        res.status(404).json({ message: "Family not found" }); return;
        return;
      }
      
      res.json(family);
    } catch (error) {
      res.status(500).json({ message: "Error updating family", error }); return;
    }
  }

  async deleteFamily(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.familyService.deleteFamily(id);
      
      if (!success) {
        res.status(404).json({ message: "Family not found" }); return;
        return;
      }
      
      res.status(204).send(); return;
    } catch (error) {
      res.status(500).json({ message: "Error deleting family", error }); return;
    }
  }

  async getFamiliesByOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderId = parseInt(req.params.orderId);
      const families = await this.familyService.getFamiliesByOrder(orderId);
      res.json(families);
    } catch (error) {
      res.status(500).json({ message: "Error fetching families by order", error }); return;
    }
  }

  async searchFamilies(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.query;
      
      if (!name || typeof name !== 'string') {
        res.status(400).json({ message: "Search name is required" }); return;
        return;
      }

      const families = await this.familyService.searchFamilies(name);
      res.json(families);
    } catch (error) {
      res.status(500).json({ message: "Error searching families", error }); return;
    }
  }
} 