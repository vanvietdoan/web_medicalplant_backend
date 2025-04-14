import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Class } from "../entities/Class";
import { ILike } from "typeorm";

export class ClassRepository {
  private repository: Repository<Class>;

  constructor() {
    this.repository = AppDataSource.getRepository(Class);
  }

  async findAll(): Promise<Class[]> {
    return this.repository.find({
      relations: ["division"]
    });
  }

  async findById(id: number): Promise<Class | null> {
    return this.repository.findOne({
      where: { class_id: id },
      relations: ["division"]
    });
  }

  async create(class_: Partial<Class>): Promise<Class> {
    const newClass = this.repository.create(class_);
    return this.repository.save(newClass);
  }

  async update(id: number, class_: Partial<Class>): Promise<Class | null> {
    await this.repository.update(id, class_);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  async findByDivision(divisionId: number): Promise<Class[]> {
    return this.repository.find({
      where: { division: { division_id: divisionId } },
      relations: ["division"]
    });
  }

  async searchByName(name: string): Promise<Class[]> {
    return this.repository.find({
      where: { name: ILike(`%${name}%`) },
      relations: ["division"]
    });
  }
} 