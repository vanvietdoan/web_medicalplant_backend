import { Repository } from "typeorm";
import { Service } from "typedi";
import { AppDataSource } from "../config/database";
import { Species } from "../entities/Species";
import { ILike } from "typeorm";

@Service()
export class SpeciesRepository {
  private repository: Repository<Species>;

  constructor() {
    this.repository = AppDataSource.getRepository(Species);
  }

  public async findAll(): Promise<Species[]> {
    return this.repository.find({
      relations: ["genus"]
    });
  }

  public async findById(id: number): Promise<Species | null> {
    return this.repository.findOne({
      where: { species_id: id },
      relations: ["genus"]
    });
  }

  public async create(species: Partial<Species>): Promise<Species> {
    const newSpecies = this.repository.create(species);
    return this.repository.save(newSpecies);
  }

  public async update(id: number, species: Partial<Species>): Promise<Species | null> {
    await this.repository.update(id, species);
    return this.findById(id);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  public async findByGenus(genusId: number): Promise<Species[]> {
    return this.repository.find({
      where: { genus: { genus_id: genusId } },
      relations: ["genus"]
    });
  }

  public async searchByName(name: string): Promise<Species[]> {
    return this.repository.find({
      where: { name: ILike(`%${name}%`) },
      relations: ["genus"]
    });
  }
} 