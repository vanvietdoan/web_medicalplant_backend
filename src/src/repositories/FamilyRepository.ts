import { Repository } from "typeorm";
import { Service } from "typedi";
import { AppDataSource } from "../config/database";
import { Family } from "../entities/Family";
import { ILike } from "typeorm";

@Service()
export class FamilyRepository {
  private repository: Repository<Family>;

  constructor() {
    this.repository = AppDataSource.getRepository(Family);
  }

  public async findAll(): Promise<Family[]> {
    return this.repository.find({
      relations: ["order"]
    });
  }

  public async findById(id: number): Promise<Family | null> {
    return this.repository.findOne({
      where: { family_id: id },
      relations: ["order"]
    });
  }

  public async create(family: Partial<Family>): Promise<Family> {
    const newFamily = this.repository.create(family);
    return this.repository.save(newFamily);
  }

  public async update(id: number, family: Partial<Family>): Promise<Family | null> {
    await this.repository.update(id, family);
    return this.findById(id);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  public async findByOrder(orderId: number): Promise<Family[]> {
    return this.repository.find({
      where: { order: { order_id: orderId } },
      relations: ["order"]
    });
  }

  public async searchByName(name: string): Promise<Family[]> {
    return this.repository.find({
      where: { name: ILike(`%${name}%`) },
      relations: ["order"]
    });
  }
} 