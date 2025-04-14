import { Request, Response } from "express";
import { FamilyService } from "../services/FamilyService";
import { Family } from "../entities/Family";

export class FamilyController {
  private familyService: FamilyService;

  constructor() {
    this.familyService = new FamilyService();
  }

  async getAllFamilies(req: Request, res: Response): Promise<void> {
    try {
      const families = await this.familyService.getAllFamilies();
      res.json(families);
    } catch (error) {
      res.status(500).json({ message: "Error fetching families", error });
    }
  }

  async getFamilyById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const family = await this.familyService.getFamilyById(id);
      
      if (!family) {
        res.status(404).json({ message: "Family not found" });
        return;
      }
      
      res.json(family);
    } catch (error) {
      res.status(500).json({ message: "Error fetching family", error });
    }
  }

  async createFamily(req: Request, res: Response): Promise<void> {
    try {
      const familyData = req.body;
      
      // Validate input data
      const validationErrors = await this.familyService.validateFamilyData(familyData);
      if (validationErrors.length > 0) {
        res.status(400).json({ message: "Validation failed", errors: validationErrors });
        return;
      }

      const family = await this.familyService.createFamily(familyData);
      res.status(201).json(family);
    } catch (error) {
      res.status(500).json({ message: "Error creating family", error });
    }
  }

  async updateFamily(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const familyData = req.body;
      
      // Validate input data
      const validationErrors = await this.familyService.validateFamilyData(familyData);
      if (validationErrors.length > 0) {
        res.status(400).json({ message: "Validation failed", errors: validationErrors });
        return;
      }

      const family = await this.familyService.updateFamily(id, familyData);
      
      if (!family) {
        res.status(404).json({ message: "Family not found" });
        return;
      }
      
      res.json(family);
    } catch (error) {
      res.status(500).json({ message: "Error updating family", error });
    }
  }

  async deleteFamily(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.familyService.deleteFamily(id);
      
      if (!success) {
        res.status(404).json({ message: "Family not found" });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting family", error });
    }
  }

  async getFamiliesByOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderId = parseInt(req.params.orderId);
      const families = await this.familyService.getFamiliesByOrder(orderId);
      res.json(families);
    } catch (error) {
      res.status(500).json({ message: "Error fetching families by order", error });
    }
  }

  async searchFamilies(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.query;
      
      if (!name || typeof name !== 'string') {
        res.status(400).json({ message: "Search name is required" });
        return;
      }

      const families = await this.familyService.searchFamilies(name);
      res.json(families);
    } catch (error) {
      res.status(500).json({ message: "Error searching families", error });
    }
  }
} 