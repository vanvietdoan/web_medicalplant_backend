import { Service } from "typedi";
import { PlantRepository } from "../repositories/PlantRepository";
import { IPlant, IFilterPlants } from "../interfaces/IPlant";
import logger from "../utils/logger";

@Service()
export class PlantService {
  private plantRepository: PlantRepository;

  constructor() {
    this.plantRepository = new PlantRepository();
  }

  public async getAllPlants(): Promise<IPlant[]> {
    logger.info('Service getAllPlants');
    const plants = await this.plantRepository.findAll();
    logger.info("plants", plants);
    return plants;
  }

  public async getPlantById(id: number): Promise<IPlant | null> {
    logger.info(`Fetching plant with id: ${id}`);
    const plant = await this.plantRepository.findById(id);
    if (plant) {
      logger.info(`Found plant: ${plant.name}`);
    } else {
      logger.warn(`Plant with id ${id} not found`);
    }
    return plant;
  }

  public async createPlant(plant: Partial<IPlant>): Promise<IPlant> {
    logger.info('Creating new plant:', plant);
    const createdPlant = await this.plantRepository.create(plant);
    logger.info(`Plant created successfully with id: ${createdPlant.plant_id}`);
    return createdPlant;
  }

  public async updatePlant(id: number, plant: Partial<IPlant>): Promise<IPlant | null> {
    logger.info(`Updating plant with id ${id}:`, plant);
    const updatedPlant = await this.plantRepository.update(id, plant);
    if (updatedPlant) {
      logger.info(`Plant ${id} updated successfully`);
    } else {
      logger.warn(`Failed to update plant ${id} - not found`);
    }
    return updatedPlant;
  }

  public async deletePlant(id: number): Promise<boolean> {
    logger.info(`Attempting to delete plant with id: ${id}`);
    const result = await this.plantRepository.delete(id);
    if (result) {
      logger.info(`Plant ${id} deleted successfully`);
    } else {
      logger.warn(`Failed to delete plant ${id} - not found`);
    }
    return result;
  }

  public async filterPlants(filter: IFilterPlants): Promise<IPlant[]> {
    logger.info('Filtering plants:', filter);
    const plants = await this.plantRepository.filterPlants(filter);

    if (plants.length === 0) {
      logger.warn('No plants found with the given filter');
    }
    return plants;
  }
}