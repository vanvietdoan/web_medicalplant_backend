import { Repository, ILike } from "typeorm";
import { AppDataSource } from "../config/database";
import { Plant } from "../entities/Plant";
import { IPlant, IFilterPlants } from "../interfaces/IPlant";
import logger from "../utils/logger";
import { Service } from "typedi";

@Service()
export class PlantRepository {
  private repository: Repository<IPlant>;

  constructor() {
    this.repository = AppDataSource.getRepository(Plant);
  }

  public async findAll(): Promise<IPlant[]> {
    logger.info('Finding all plants');
    return this.repository.find();
  }

  public async findById(id: number): Promise<IPlant | null> {
    logger.info(`Finding plant with id: ${id}`);
    return this.repository.findOne({
      where: { plant_id: id }
    });
  }

  public async create(plant: Partial<IPlant>): Promise<IPlant> {
    logger.info('Creating new plant');
    const newPlant = this.repository.create(plant);
    return this.repository.save(newPlant);
  }

  public async update(id: number, plant: Partial<IPlant>): Promise<IPlant | null> {
    logger.info(`Updating plant with id: ${id}`);
    await this.repository.update(id, plant);
    return this.findById(id);
  }

  public async delete(id: number): Promise<boolean> {
    logger.info(`Deleting plant with id: ${id}`);
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  public async filterPlants(query: Partial<IFilterPlants>): Promise<IPlant[]> {
    logger.info('Filtering plants based on taxonomy and names:', query);
    
    // Start with a basic query builder
    const queryBuilder = this.repository.createQueryBuilder('plant');
    
    // Only add joins if we need them based on the filter criteria
    let needsTaxonomyJoins = false;
    
    if (query.divisionId || query.classId || query.orderId || 
        query.familyId || query.genusId || query.speciesId) {
      needsTaxonomyJoins = true;
      
      // Add the necessary joins
      queryBuilder
        .leftJoin('plant.species', 'species')
        .leftJoin('species.genus', 'genus')
        .leftJoin('genus.family', 'family')
        .leftJoin('family.order', 'order')
        .leftJoin('order.class', 'class')
        .leftJoin('class.division', 'division');
    }
    
    // Add where conditions only for provided parameters
    let hasCondition = false;
    
    if (query.divisionId) {
      queryBuilder.andWhere('division.division_id = :divisionId', { divisionId: query.divisionId });
      hasCondition = true;
    }
    
    if (query.classId) {
      queryBuilder.andWhere('class.class_id = :classId', { classId: query.classId });
      hasCondition = true;
    }
    
    if (query.orderId) {
      queryBuilder.andWhere('order.order_id = :orderId', { orderId: query.orderId });
      hasCondition = true;
    }
    
    if (query.familyId) {
      queryBuilder.andWhere('family.family_id = :familyId', { familyId: query.familyId });
      hasCondition = true;
    }
    
    if (query.genusId) {
      queryBuilder.andWhere('genus.genus_id = :genusId', { genusId: query.genusId });
      hasCondition = true;
    }
    
    if (query.speciesId) {
      queryBuilder.andWhere('species.species_id = :speciesId', { speciesId: query.speciesId });
      hasCondition = true;
    }
    
    // Add name search if provided
    if (query.name) {
      // If we have taxonomy joins, search across all taxonomy levels
      if (needsTaxonomyJoins) {
        queryBuilder.andWhere(
          '(plant.name ILIKE :name OR plant.english_name ILIKE :name OR ' +
          'species.name ILIKE :name OR genus.name ILIKE :name OR ' +
          'family.name ILIKE :name OR order.name ILIKE :name OR ' +
          'class.name ILIKE :name OR division.name ILIKE :name)',
          { name: `%${query.name}%` }
        );
      } else {
        // Otherwise just search plant names
        queryBuilder.andWhere(
          '(plant.name ILIKE :name OR plant.english_name ILIKE :name)',
          { name: `%${query.name}%` }
        );
      }
      hasCondition = true;
    }
    
    // If no conditions were added, we'll return all plants
    if (!hasCondition) {
      logger.info('No filter conditions provided, returning all plants');
    }
    
    return queryBuilder.getMany();
  }
}