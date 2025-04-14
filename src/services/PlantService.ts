import { PlantRepository } from "../repositories/PlantRepository";
import { IPlant, IFilterPlants } from "../interfaces/IPlant";
import logger  from "../utils/logger";

export class PlantService {
  private plantRepository: PlantRepository;

  constructor() {
    this.plantRepository = new PlantRepository();
  }

  async getAllPlants(): Promise<IPlant[]> {
    logger.info('Service getAllPlants');
    return this.plantRepository.findAll();
  }

  async getPlantById(id: number): Promise<IPlant | null> {
    logger.info(`Fetching plant with id: ${id}`);
    const plant = await this.plantRepository.findById(id);
    if (plant) {
      logger.info(`Found plant: ${plant.name}`);
    } else {
      logger.warn(`Plant with id ${id} not found`);
    }
    return plant;
  }

  async createPlant(plant: Partial<IPlant>): Promise<IPlant> {
    logger.info('Creating new plant:', plant);
    const createdPlant = await this.plantRepository.create(plant);
    logger.info(`Plant created successfully with id: ${createdPlant.plant_id}`);
    return createdPlant;
  }

  async updatePlant(id: number, plant: Partial<IPlant>): Promise<IPlant | null> {
    logger.info(`Updating plant with id ${id}:`, plant);
    const updatedPlant = await this.plantRepository.update(id, plant);
    if (updatedPlant) {
      logger.info(`Plant ${id} updated successfully`);
    } else {
      logger.warn(`Failed to update plant ${id} - not found`);
    }
    return updatedPlant;
  }

  async deletePlant(id: number): Promise<boolean> {
    logger.info(`Attempting to delete plant with id: ${id}`);
    const result = await this.plantRepository.delete(id);
    if (result) {
      logger.info(`Plant ${id} deleted successfully`);
    } else {
      logger.warn(`Failed to delete plant ${id} - not found`);
    }
    return result;
  }

  async filterPlants( filter: IFilterPlants): Promise<IPlant[]> {
    logger.info('Filtering plants:', filter);
    const plants = await this.plantRepository.filterPlants(filter);

    if (plants.length === 0){
      logger.warn('No plants found with the given filter');
    }
    return plants;
  }

}