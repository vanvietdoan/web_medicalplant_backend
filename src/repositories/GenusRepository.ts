import { Repository } from "typeorm";
import { Service } from "typedi";
import { AppDataSource } from "../config/database";
import { Genus } from "../entities/Genus";
import { ILike } from "typeorm";

@Service()
export class GenusRepository {
  private repository: Repository<Genus>;

  constructor() {
    this.repository = AppDataSource.getRepository(Genus);
  }

  public async findAll(): Promise<Genus[]> {
    return this.repository.find();
  }

  public async findById(id: number): Promise<Genus | null> {
    return this.repository.findOne({
      where: { genus_id: id }
    });
  }

  public async create(genus: Partial<Genus>): Promise<Genus> {
    const newGenus = this.repository.create(genus);
    return this.repository.save(newGenus);
  }

  public async update(id: number, genus: Partial<Genus>): Promise<Genus | null> {
    await this.repository.update(id, genus);
    return this.findById(id);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  public async findByFamily(familyId: number): Promise<Genus[]> {
    return this.repository.find({
      where: { family: { family_id: familyId } },
      relations: ["family"]
    });
  }

  public async searchByName(name: string): Promise<Genus[]> {
    return this.repository.find({
      where: { name: ILike(`%${name}%`) },
      relations: ["family"]
    });
  }
} 