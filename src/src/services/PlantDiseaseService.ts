import { Service } from "typedi";
import { PlantDisease } from "../entities/PlantDisease";
import { IPlantDisease } from "../interfaces/IPlantDisease";
import { PlantDiseaseRepository } from "../repositories/PlantDiseaseRepository";

@Service()
export class PlantDiseaseService {
  constructor(
    private plantDiseaseRepository: PlantDiseaseRepository
  ) {}

  public async getAllPlantDiseases(): Promise<IPlantDisease[]> {
    return this.plantDiseaseRepository.findAll();
  }

  public async getPlantDiseaseById(id: number): Promise<IPlantDisease | null> {
    return this.plantDiseaseRepository.findById(id);
  }

  public async createPlantDisease(data: Partial<IPlantDisease>): Promise<IPlantDisease> {
    return this.plantDiseaseRepository.create(data as Partial<PlantDisease>);
  }

  public async updatePlantDisease(id: number, data: Partial<IPlantDisease>): Promise<IPlantDisease | null> {
    return this.plantDiseaseRepository.update(id, data as Partial<PlantDisease>);
  }

  public async deletePlantDisease(id: number): Promise<boolean> {
    return this.plantDiseaseRepository.delete(id);
  }

  public async getPlantDiseasesByPlant(plantId: number): Promise<IPlantDisease[]> {
    return this.plantDiseaseRepository.findByPlant(plantId);
  }

  public async getPlantDiseasesByDisease(diseaseId: number): Promise<IPlantDisease[]> {
    return this.plantDiseaseRepository.findByDisease(diseaseId);
  }

  public async searchPlantDiseasesBySymptoms(symptoms: string): Promise<IPlantDisease[]> {
    return this.plantDiseaseRepository.searchBySymptoms(symptoms);
  }

  public async searchPlantDiseasesByTreatment(treatment: string): Promise<IPlantDisease[]> {
    return this.plantDiseaseRepository.searchByTreatment(treatment);
  }
}
