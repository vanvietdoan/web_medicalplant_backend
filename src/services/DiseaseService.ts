import { Service } from "typedi";
import { DiseaseRepository } from "../repositories/DiseaseRepository";
import { AdviceCommentRepository } from "../repositories/AdviceCommentRepository";
import { Disease } from "../entities/Disease";
import { AdviceComment } from "../entities/AdviceComment";
import { IDisease } from "../interfaces/IDisease";

@Service()
export class DiseaseService {
  constructor(
    private diseaseRepository: DiseaseRepository,
    private adviceCommentRepository: AdviceCommentRepository
  ) {}

  public async getAllDiseases(): Promise<IDisease[]> {
    return this.diseaseRepository.findAll();
  }

  public async getDiseaseById(id: number): Promise<IDisease | null> {
    return this.diseaseRepository.findById(id);
  }

  public async createDisease(disease: Partial<IDisease>): Promise<IDisease> {
    return this.diseaseRepository.create(disease);
  }

  public async updateDisease(id: number, disease: Partial<IDisease>): Promise<IDisease | null> {
    return this.diseaseRepository.update(id, disease);
  }

  public async deleteDisease(id: number): Promise<boolean> {
    return this.diseaseRepository.delete(id);
  }

  public async searchByName(name: string): Promise<IDisease[]> {
    return this.diseaseRepository.searchByName(name);
  }

  public async searchBySymptoms(symptoms: string): Promise<IDisease[]> {
    return this.diseaseRepository.searchBySymptoms(symptoms);
  }

  public async getDiseaseWithAdvice(id: number): Promise<{ disease: Disease | null; advice: AdviceComment[] }> {
    const disease = await this.diseaseRepository.findById(id);
    const advice = disease ? await this.adviceCommentRepository.findByDisease(id) : [];
    
    return { disease, advice };
  }

  public async addAdviceToDisease(diseaseId: number, adviceData: Partial<AdviceComment>): Promise<AdviceComment> {
    const disease = await this.diseaseRepository.findById(diseaseId);
    if (!disease) {
      throw new Error('Disease not found');
    }
    
    return this.adviceCommentRepository.create({
      ...adviceData,
      disease
    });
  }
} 