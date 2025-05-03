import { Service } from "typedi";
import { PlantRepository } from "../repositories/PlantRepository";
import { IPlant, IFilterPlants } from "../interfaces/IPlant";
import { PictureRepository } from "../repositories/PictureRepository";
import { Picture } from "../entities/Picture";
import logger  from "../utils/logger";

@Service()
export class PlantService {
  private plantRepository: PlantRepository;
  private pictureRepository: PictureRepository;
  constructor() {
    this.plantRepository = new PlantRepository();
    this.pictureRepository = new PictureRepository();
    }

    public async getAllPlants(): Promise<any[]> {
      console.log('Service getAllPlants');
      const plants = await this.plantRepository.findAll();
      const pictures = await this.pictureRepository.findAll();
      
      return plants.map(plant => ({
        created_at: plant.created_at,
        updated_at: plant.updated_at,
        plant_id: plant.plant_id,
        name: plant.name,
        english_name: plant.english_name,
        description: plant.description,
        species: plant.species ? {
          species_id: plant.species.species_id,
          name: plant.species.name
        } : null,
        instructions: plant.instructions,
        benefits: plant.benefits,
        images: pictures
          .filter((picture: Picture) => picture.plant_id === plant.plant_id)
          .map((picture: Picture) => ({
            picture_id: picture.picture_id,
            url: picture.url
          }))
      }));
    }
    public async getNewPlants(): Promise<any[]> {
      console.log('Service getNewPlants');
      const plants = await this.plantRepository.findNew();
      const pictures = await this.pictureRepository.findAll();
      
      return plants.map(plant => ({
        created_at: plant.created_at,
        updated_at: plant.updated_at,
        plant_id: plant.plant_id,
        name: plant.name,
        english_name: plant.english_name,
        description: plant.description,
        species: plant.species ? {
          species_id: plant.species.species_id,
          name: plant.species.name
        } : null,
        instructions: plant.instructions,
        benefits: plant.benefits,
        images: pictures
          .filter((picture: Picture) => picture.plant_id === plant.plant_id)
          .map((picture: Picture) => ({
            picture_id: picture.picture_id,
            url: picture.url
          }))
      }));
    }
    public async getMultipleBenefits(): Promise<any[]> {
      console.log('Service getMultipleBenefits');
      const plants = await this.plantRepository.finMultipleBenifit();
      const pictures = await this.pictureRepository.findAll();
      
      return plants.map(plant => ({ 
        created_at: plant.created_at,
        updated_at: plant.updated_at,
        plant_id: plant.plant_id,
        name: plant.name,
        english_name: plant.english_name,
        description: plant.description,
        species: plant.species ? {
          species_id: plant.species.species_id,
          name: plant.species.name
        } : null,
        instructions: plant.instructions,
        benefits: plant.benefits,
        images: pictures
          .filter((picture: Picture) => picture.plant_id === plant.plant_id)
          .map((picture: Picture) => ({
            picture_id: picture.picture_id,
            url: picture.url
          }))
      }));
    }
  public async getPlantById(id: number): Promise<IPlant | null> {
    console.log('Service getPlantById', id);
    const plant = await this.plantRepository.findById(id);
    const pictures = await this.pictureRepository.findAll();
    if (!plant) {
      return null;
    }
    return {
      ...plant,
      images: pictures
        .filter((picture: Picture) => picture.plant_id === id)
        .map((picture: Picture) => ({
          picture_id: picture.picture_id,
          url: picture.url
        }))
    };
  }

  public async createPlant(plantData: Partial<IPlant> & { images?: Array<{ url: string }> }): Promise<IPlant> {
    const { images, ...plantInfo } = plantData;
    const createdPlant = await this.plantRepository.create(plantInfo);
    if (images && images.length > 0) {
      await Promise.all(images.map(image => 
        this.pictureRepository.create({
          url: image.url,
          plant_id: createdPlant.plant_id
        })
      ));
    }
    return this.getPlantById(createdPlant.plant_id) as Promise<IPlant>;
  }

  public async updatePlant(id: number, plantData: Partial<IPlant> & { images?: Array<{ url: string }> }): Promise<IPlant | null> {
    const { images, ...plantInfo } = plantData;
    await this.plantRepository.update(id, plantInfo);
    if (images) {
      const existingPictures = await this.pictureRepository.findByPlant(id);
      await Promise.all(existingPictures.map(picture => 
        this.pictureRepository.delete(picture.picture_id)
      ));
      await Promise.all(images.map(image => 
        this.pictureRepository.create({
          url: image.url,
          plant_id: id
        })
      ));
    }
    return this.getPlantById(id) as Promise<IPlant>;
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

  public async filterPlants( filter: IFilterPlants): Promise<IPlant[]> {
    logger.info('Filtering plants:', filter);
    const plants = await this.plantRepository.filterPlants(filter);
    const pictures = await this.pictureRepository.findAll();
    if (!plants) {
      return [];
    }
    return plants.map(plant => ({
      ...plant,
      images: pictures
        .filter((picture: Picture) => picture.plant_id === plant.plant_id)
        .map((picture: Picture) => ({
          picture_id: picture.picture_id,
          url: picture.url
        }))
    }));

  }

}