import { Repository } from "typeorm";
import { Service } from "typedi";
import { AppDataSource } from "../config/database";
import { Disease } from "../entities/Disease";
import { ILike } from "typeorm";


@Service()
export class DiseaseRepository {
  private repository: Repository<Disease>;

  constructor() {
    this.repository = AppDataSource.getRepository(Disease);
  }

  public async findAll(): Promise<Disease[]> {
    console.log('Repository findAll');
    return this.repository.find({
    });
  }

  public async findById(id: number): Promise<Disease | null> {
    return this.repository.findOne({
      where: { disease_id: id }
    });
  }

  public async create(disease: Partial<Disease>): Promise<Disease> {
    const newDisease = this.repository.create(disease);
    return this.repository.save(newDisease);
  }

  public async update(id: number, disease: Partial<Disease>): Promise<Disease | null> {
    await this.repository.update(id, disease);
    return this.findById(id);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  public async searchByName(name: string): Promise<Disease[]> {
    return this.repository.find({
      where: { name: ILike(`%${name}%`) }
    });
  }

  public async searchBySymptoms(symptoms: string): Promise<Disease[]> {
    return this.repository.find({
      where: { symptoms: ILike(`%${symptoms}%`) }
    });
  }
} 