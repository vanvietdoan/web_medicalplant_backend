import { Repository } from "typeorm";
import { Service } from "typedi";
import { AppDataSource } from "../config/database";
import { PlantDisease } from "../entities/PlantDisease";
import { ILike } from "typeorm";

@Service()
export class PlantDiseaseRepository {
  private repository: Repository<PlantDisease>;

  constructor() {
    this.repository = AppDataSource.getRepository(PlantDisease);
  }

  public async findAll(): Promise<PlantDisease[]> {
    return this.repository.find({
      relations: ["plant", "disease"]
    });
  }

  public async findById(id: number): Promise<PlantDisease | null> {
    return this.repository.findOne({
      where: { plant_disease_id: id },
      relations: ["plant", "disease"]
    });
  }

  public async create(plantDisease: Partial<PlantDisease>): Promise<PlantDisease> {
    const newPlantDisease = this.repository.create(plantDisease);
    return this.repository.save(newPlantDisease);
  }

  public async update(id: number, plantDisease: Partial<PlantDisease>): Promise<PlantDisease | null> {
    await this.repository.update(id, plantDisease);
    return this.findById(id);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  public async findByPlant(plantId: number): Promise<PlantDisease[]> {
    return this.repository.find({
      where: { plant: { plant_id: plantId } },
      relations: ["plant", "disease"]
    });
  }

  public async findByDisease(diseaseId: number): Promise<PlantDisease[]> {
    return this.repository.find({
      where: { disease: { disease_id: diseaseId } },
      relations: ["plant", "disease"]
    });
  }

  public async searchBySymptoms(symptoms: string): Promise<PlantDisease[]> {
    return this.repository.find({
      where: { symptoms: ILike(`%${symptoms}%`) },
      relations: ["plant", "disease"]
    });
  }

  public async searchByTreatment(treatment: string): Promise<PlantDisease[]> {
    return this.repository.find({
      where: { treatment: ILike(`%${treatment}%`) },
      relations: ["plant", "disease"]
    });
  }
} 