import { Repository, ILike, MoreThan } from "typeorm";
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
  public async finMultipleBenifit(): Promise<IPlant[]> {
    logger.info('Finding top 10 plants with most benefits');
    
    const plants = await this.repository.find({
      relations: ['species']
    });

    // Sort plants by number of commas in benefits
    const sortedPlants = plants.sort((a, b) => {
      const aCommas = (a.benefits.match(/,/g) || []).length;
      const bCommas = (b.benefits.match(/,/g) || []).length;
      return bCommas - aCommas;
    });

    // Take top 10
    const top10Plants = sortedPlants.slice(0, 10);
    
    logger.info(`Found ${top10Plants.length} plants with most benefits`);
    return top10Plants;
  }
  

  public async findNew(): Promise<IPlant[]> {
    logger.info('Finding 10 most recently updated plants');
    
    const plants = await this.repository.find({
      order: {
        updated_at: 'DESC'
      },
      take: 10,
      relations: ['species']
    });
    
    logger.info(`Found ${plants.length} recently updated plants`);
    return plants;
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
    return result.affected !== 0;
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

  public async findByEnglishName(englishName: string): Promise<IPlant | null> {
    logger.info(`Finding plant with English name: ${englishName}`);
    return this.repository.findOne({
      where: { english_name: englishName }
    });
  }
}