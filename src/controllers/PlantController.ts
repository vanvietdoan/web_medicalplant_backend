import { Request, Response } from "express";
import { Service } from "typedi";
import { PlantService } from "../services/PlantService";
import { IFilterPlants, IPlant } from "../interfaces/IPlant";
import logger from "../utils/logger";

@Service()
export class PlantController {
  constructor(
    private plantService: PlantService
  ) {}

  public async getAllPlants(req: Request, res: Response): Promise<void> {
    try {
      logger.info('Getting all plants');
      const plants = await this.plantService.getAllPlants();
      logger.info('Successfully retrieved all plants');
      res.json(plants);
    } catch (error) {
      logger.error('Error fetching plants:', error);
      res.status(500).json({ message: "Error fetching plants", error });
    }
  }
  
  public async getNewPlants(req: Request, res: Response): Promise<void> {
    try {
      logger.info('Getting new plants');
      const plants = await this.plantService.getNewPlants();
      logger.info('Successfully retrieved new plants');
      res.json(plants);
    } catch (error) {
      logger.error('Error fetching plants:', error);
      res.status(500).json({ message: "Error fetching plants", error });
    }
  }

  public async getPlantById(req: Request, res: Response): Promise<void> {
    try {
      const idParam = req.params.id;
      const id = parseInt(idParam);
      
      // Check if id is a valid number
      if (isNaN(id)) {
        logger.warn(`Invalid plant id provided: ${idParam}`);
        res.status(400).json({ message: "Invalid plant ID to get. Please provide a numeric ID." });
        return;
      }
      
      logger.info(`Getting plant with id: ${id}`);
      const plant = await this.plantService.getPlantById(id);
      
      if (!plant) {
        logger.warn(`Plant with id ${id} not found`);
        res.status(404).json({ message: "Plant not found" });
        return;
      }
      
      logger.info(`Successfully retrieved plant with id: ${id}`);
      res.json(plant);
    } catch (error) {
      logger.error(`Error fetching plant with id ${req.params.id}:`, error);
      res.status(500).json({ message: "Error fetching plant", error });
    }
  }

  public async createPlant(req: Request, res: Response): Promise<void> {
    try {
      logger.info('Creating new plant:', req.body);
      const plant: Partial<IPlant> = req.body;
      
      // Basic validation
      if (!plant.name || !plant.species_id) {
        logger.warn('Invalid plant data to create:', plant);
        res.status(400).json({ message: "Plant name and species_id are required" });
        return;
      }
      
      const newPlant = await this.plantService.createPlant(plant);
      logger.info('Successfully created new plant:', newPlant);
      res.status(201).json(newPlant);
    } catch (error) {
      logger.error('Error creating plant:', error);
      res.status(500).json({ message: "Error creating plant", error });
    }
  }

  public async updatePlant(req: Request, res: Response): Promise<void> {
    try {
      const idParam = req.params.id;
      const id = parseInt(idParam);
      
      // Check if id is a valid number
      if (isNaN(id)) {
        logger.warn(`Invalid plant id provided for update: ${idParam}`);
        res.status(400).json({ message: "Invalid plant ID to update. Please provide a numeric ID." });
        return;
      }
      
      const plant: Partial<IPlant> = req.body;
      
      // Basic validation
      if (Object.keys(plant).length === 0) {
        logger.warn(`Empty update data for plant with id ${id}`);
        res.status(400).json({ message: "No update data provided" });
        return;
      }
      
      logger.info(`Updating plant with id ${id}:`, plant);
      const updatedPlant = await this.plantService.updatePlant(id, plant);
      
      if (!updatedPlant) {
        logger.warn(`Plant with id ${id} not found for update`);
        res.status(404).json({ message: "Plant not found" });
        return;
      }
      
      logger.info(`Successfully updated plant with id ${id}:`, updatedPlant);
      res.json(updatedPlant);
    } catch (error) {
      logger.error(`Error updating plant with id ${req.params.id}:`, error);
      res.status(500).json({ message: "Error updating plant", error });
    }
  }

  public async deletePlant(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid plant ID to delete. Please provide a numeric ID." });
        return;
      }
      
      logger.info(`Deleting plant with id: ${id}`);
      const result = await this.plantService.deletePlant(id);
      
      if (!result) {
        logger.warn(`Plant with id ${id} not found for deletion`);
        res.status(404).json({ message: "Plant not found" });
        return;
      }
      
      logger.info(`Successfully deleted plant with id: ${id}`);
      res.json({ message: "Plant deleted successfully" });
    } catch (error) {
      logger.error(`Error deleting plant with id ${req.params.id}:`, error);
      res.status(500).json({ message: "Error deleting plant", error });
    }
  }

  public async filterPlants(req: Request, res: Response): Promise<void> {
    try {
      const { name, divisionId, classId, orderId, speciesId, genusId, familyId } = req.query;
      
      logger.info('Filtering plants with query parameters:', req.query);
      
      const query: IFilterPlants = {};
      
      // Only add parameters that are provided
      if (name) query.name = name as string;
      if (divisionId) query.divisionId = parseInt(divisionId as string);
      if (classId) query.classId = parseInt(classId as string);
      if (orderId) query.orderId = parseInt(orderId as string);
      if (speciesId) query.speciesId = parseInt(speciesId as string);
      if (genusId) query.genusId = parseInt(genusId as string);
      if (familyId) query.familyId = parseInt(familyId as string);
      
      const plants = await this.plantService.filterPlants(query);
      
      logger.info(`Found ${plants.length} plants matching the filter criteria`);
      res.json(plants);
    } catch (error) {
      logger.error('Error filtering plants:', error);
      res.status(500).json({ message: "Error filtering plants", error });
    }
  }
}