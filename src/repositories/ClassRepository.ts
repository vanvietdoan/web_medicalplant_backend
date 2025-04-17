import { Repository } from "typeorm";
import { Service } from "typedi";
import { AppDataSource } from "../config/database";
import { Class } from "../entities/Class";
import { ILike } from "typeorm";

@Service()
export class ClassRepository {
  private repository: Repository<Class>;

  constructor() {
    this.repository = AppDataSource.getRepository(Class);
  }

  public async findAll(): Promise<Class[]> {
    return this.repository.find({
      relations: ["division"]
    });
  }

  public async findById(id: number): Promise<Class | null> {
    return this.repository.findOne({
      where: { class_id: id },
      relations: ["division"]
    });
  }

  public async create(class_: Partial<Class>): Promise<Class> {
    const newClass = this.repository.create(class_);
    return this.repository.save(newClass);
  }

  public async update(id: number, class_: Partial<Class>): Promise<Class | null> {
    await this.repository.update(id, class_);
    return this.findById(id);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  public async findByDivision(divisionId: number): Promise<Class[]> {
    return this.repository.find({
      where: { division: { division_id: divisionId } },
      relations: ["division"]
    });
  }

  public async searchByName(name: string): Promise<Class[]> {
    return this.repository.find({
      where: { name: ILike(`%${name}%`) },
      relations: ["division"]
    });
  }
} 