import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Division } from "../entities/Division";
import { ILike } from "typeorm";

export class DivisionRepository {
  private repository: Repository<Division>;

  constructor() {
    this.repository = AppDataSource.getRepository(Division);
  }

  async findAll(): Promise<Division[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Division | null> {
    return this.repository.findOne({
      where: { division_id: id }
    });
  }

  async create(division: Partial<Division>): Promise<Division> {
    const newDivision = this.repository.create(division);
    return this.repository.save(newDivision);
  }

  async update(id: number, division: Partial<Division>): Promise<Division | null> {
    await this.repository.update(id, division);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

async searchByName(name: string): Promise<Division[]> {
  if (!name?.trim()) {
    return [];
  }

  try {
    return this.repository.find({
      where: {
        name: ILike(`%${name.trim()}%`)
      }
    });
  } catch (error) {
    console.error('Error searching divisions by name:', error);
    return [];
  }
 }
} 