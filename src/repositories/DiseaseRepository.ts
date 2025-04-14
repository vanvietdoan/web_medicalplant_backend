import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Disease } from "../entities/Disease";
import { ILike } from "typeorm";

export class DiseaseRepository {
  private repository: Repository<Disease>;

  constructor() {
    this.repository = AppDataSource.getRepository(Disease);
  }

  async findAll(): Promise<Disease[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Disease | null> {
    return this.repository.findOne({
      where: { disease_id: id }
    });
  }

  async create(disease: Partial<Disease>): Promise<Disease> {
    const newDisease = this.repository.create(disease);
    return this.repository.save(newDisease);
  }

  async update(id: number, disease: Partial<Disease>): Promise<Disease | null> {
    await this.repository.update(id, disease);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  async searchByName(name: string): Promise<Disease[]> {
    return this.repository.find({
      where: { name: ILike(`%${name}%`) }
    });
  }

  async searchBySymptoms(symptoms: string): Promise<Disease[]> {
    return this.repository.find({
      where: { symptoms: ILike(`%${symptoms}%`) }
    });
  }
} 