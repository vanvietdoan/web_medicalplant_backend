import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Family } from "../entities/Family";
import { ILike } from "typeorm";

export class FamilyRepository {
  private repository: Repository<Family>;

  constructor() {
    this.repository = AppDataSource.getRepository(Family);
  }

  async findAll(): Promise<Family[]> {
    return this.repository.find({
      relations: ["order"]
    });
  }

  async findById(id: number): Promise<Family | null> {
    return this.repository.findOne({
      where: { family_id: id },
      relations: ["order"]
    });
  }

  async create(family: Partial<Family>): Promise<Family> {
    const newFamily = this.repository.create(family);
    return this.repository.save(newFamily);
  }

  async update(id: number, family: Partial<Family>): Promise<Family | null> {
    await this.repository.update(id, family);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  async findByOrder(orderId: number): Promise<Family[]> {
    return this.repository.find({
      where: { order: { order_id: orderId } },
      relations: ["order"]
    });
  }

  async searchByName(name: string): Promise<Family[]> {
    return this.repository.find({
      where: { name: ILike(`%${name}%`) },
      relations: ["order"]
    });
  }
} 