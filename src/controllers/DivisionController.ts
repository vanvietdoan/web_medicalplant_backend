import { Request, Response } from "express";
import { DivisionService } from "../services/DivisionService";
import logger from "../utils/logger";


export class DivisionController {
  private divisionService: DivisionService;

  constructor() {
    this.divisionService = new DivisionService();
  }
  async getAllDivisions(req: Request, res: Response): Promise<void> {
    try {
      logger.info('Getting all divisions');
      const divisions = await this.divisionService.getAllDivisions();
      logger.info('Successfully retrieved all divisions');
      res.json(divisions);
    } catch (error) {
      logger.error('Error fetching divisions:', error);
      res.status(500).json({ message: "Error fetching divisions", error });
    }
  }

  async getDivisionById(req: Request, res: Response): Promise<void> {
    try {
      const idParam = req.params.id;
      const id = parseInt(idParam);
      
      // Check if id is a valid number
      if (isNaN(id)) {
        logger.warn(`Invalid division id provided: ${idParam}`);
        res.status(400).json({ message: "Invalid division ID. Please provide a numeric ID." });
        return;
      }
      
      logger.info(`Getting division with id: ${id}`);
      const division = await this.divisionService.getDivisionById(id);
      
      if (!division) {
        logger.warn(`Division with id ${id} not found`);
        res.status(404).json({ message: "Division not found" });
        return;
      }
      
      logger.info(`Successfully retrieved division with id: ${id}`);
      res.json(division);
    } catch (error) {
      logger.error(`Error fetching division with id ${req.params.id}:`, error);
      res.status(500).json({ message: "Error fetching division", error });
    }
  }

  async createDivision(req: Request, res: Response): Promise<void> {
    try {
      logger.info('Creating new division:', req.body);
      const divisionData = req.body;
      
      // Validate input data
      const validationErrors = await this.divisionService.validateDivisionData(divisionData);
      if (validationErrors.length > 0) {
        logger.warn('Invalid division data:', validationErrors);
        res.status(400).json({ message: "Validation failed", errors: validationErrors });
        return;
      }

      const division = await this.divisionService.createDivision(divisionData);
      logger.info('Successfully created new division:', division);
      res.status(201).json(division);
    } catch (error) {
      logger.error('Error creating division:', error);
      res.status(500).json({ message: "Error creating division", error });
    }
  }

  async updateDivision(req: Request, res: Response): Promise<void> {
    try {
      const idParam = req.params.id;
      const id = parseInt(idParam);
      
      // Check if id is a valid number
      if (isNaN(id)) {
        logger.warn(`Invalid division id provided for update: ${idParam}`);
        res.status(400).json({ message: "Invalid division ID. Please provide a numeric ID." });
        return;
      }
      
      const divisionData = req.body;
      
      // Validate input data
      const validationErrors = await this.divisionService.validateDivisionData(divisionData);
      if (validationErrors.length > 0) {
        logger.warn(`Validation failed for division update:`, validationErrors);
        res.status(400).json({ message: "Validation failed", errors: validationErrors });
        return;
      }

      logger.info(`Updating division with id ${id}:`, divisionData);
      const division = await this.divisionService.updateDivision(id, divisionData);
      
      if (!division) {
        logger.warn(`Division with id ${id} not found for update`);
        res.status(404).json({ message: "Division not found" });
        return;
      }
      
      logger.info(`Successfully updated division with id ${id}:`, division);
      res.json(division);
    } catch (error) {
      logger.error(`Error updating division with id ${req.params.id}:`, error);
      res.status(500).json({ message: "Error updating division", error });
    }
  }

  async deleteDivision(req: Request, res: Response): Promise<void> {
    try {
      const idParam = req.params.id;
      const id = parseInt(idParam);
      
      // Check if id is a valid number
      if (isNaN(id)) {
        logger.warn(`Invalid division id provided for deletion: ${idParam}`);
        res.status(400).json({ message: "Invalid division ID. Please provide a numeric ID." });
        return;
      }
      
      logger.info(`Deleting division with id: ${id}`);
      const success = await this.divisionService.deleteDivision(id);
      
      if (!success) {
        logger.warn(`Division with id ${id} not found for deletion`);
        res.status(404).json({ message: "Division not found" });
        return;
      }
      
      logger.info(`Successfully deleted division with id: ${id}`);
      res.status(200).json({ message: "Division deleted successfully"});
    } catch (error) {
      logger.error(`Error deleting division with id ${req.params.id}:`, error);
      res.status(500).json({ message: "Error deleting division", error });
    }
  }

  async searchDivisions(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.query;
      
      let divisions;
      if (!name || typeof name !== 'string') {
        // If no name provided, return all divisions
        divisions = await this.divisionService.getAllDivisions();
      } else {
        // Search divisions by name
        divisions = await this.divisionService.searchDivisions(name);
      }

      res.json(divisions);
    } catch (error) {
      logger.error('Error searching divisions:', error);
      res.status(500).json({ message: "Error searching divisions", error });
    }
  }
} 