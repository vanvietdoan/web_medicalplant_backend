import { PlantDisease } from "../entities/PlantDisease";
import { getRepository, Repository } from "typeorm";
import { IPlantDisease } from "../interfaces/IPlantDisease";

export class PlantDiseaseService {
  private plantDiseaseRepository: Repository<PlantDisease>;

  constructor() {
    this.plantDiseaseRepository = getRepository(PlantDisease);
  }

  async getAllPlantDiseases(): Promise<IPlantDisease[]> {
    return this.plantDiseaseRepository.find({ relations: ["plant", "disease"] });
  }

  async getPlantDiseaseById(id: number): Promise<IPlantDisease | null> {
    return this.plantDiseaseRepository.findOne({ where: { plant_disease_id: id } });
  }

  async createPlantDisease(data: Partial<IPlantDisease>): Promise<IPlantDisease> {
    const plantDisease = this.plantDiseaseRepository.create(data);
    return this.plantDiseaseRepository.save(plantDisease);
  }

  async updatePlantDisease(id: number, data: Partial<IPlantDisease>): Promise<IPlantDisease | null> {
    const plantDisease = await this.plantDiseaseRepository.findOne({ where: { plant_disease_id: id } });
    if (!plantDisease) return null;

    Object.assign(plantDisease, data);
    return this.plantDiseaseRepository.save(plantDisease);
  }

  async deletePlantDisease(id: number): Promise<boolean> {
    const result = await this.plantDiseaseRepository.delete(id);
    return result.affected !== 0;
  }
}
