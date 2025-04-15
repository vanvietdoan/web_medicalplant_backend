import { DiseaseRepository } from "../repositories/DiseaseRepository";
import { AdviceCommentRepository } from "../repositories/AdviceCommentRepository";
import { Disease } from "../entities/Disease";
import { AdviceComment } from "../entities/AdviceComment";
import { IDisease } from "../interfaces/IDisease";
import logger from "../utils/logger";

export class DiseaseService {
  private diseaseRepository: DiseaseRepository;
  private adviceCommentRepository: AdviceCommentRepository;

  constructor() {
    this.diseaseRepository = new DiseaseRepository();
    this.adviceCommentRepository = new AdviceCommentRepository();
  }

  async getAllDiseases(): Promise<IDisease[]> {
       const getDisease =  this.diseaseRepository.findAll();
    console.log("Get disease: ", getDisease)
    return getDisease
  }

  async getDiseaseById(id: number): Promise<IDisease | null> {
    return this.diseaseRepository.findById(id);
  }

  async createDisease(disease: Partial<IDisease>): Promise<IDisease> {
    return this.diseaseRepository.create(disease);
  }

  async updateDisease(id: number, disease: Partial<IDisease>): Promise<IDisease | null> {
    return this.diseaseRepository.update(id, disease);
  }

  async deleteDisease(id: number): Promise<boolean> {
    return this.diseaseRepository.delete(id);
  }

  async searchByName(name: string): Promise<IDisease[]> {
    return this.diseaseRepository.searchByName(name);
  }

  async searchBySymptoms(symptoms: string): Promise<IDisease[]> {
    return this.diseaseRepository.searchBySymptoms(symptoms);
  }

  async getDiseaseWithAdvice(id: number): Promise<{ disease: Disease | null; advice: AdviceComment[] }> {
    const disease = await this.diseaseRepository.findById(id);
    const advice = disease ? await this.adviceCommentRepository.findByDisease(id) : [];
    
    return { disease, advice };
  }

  async addAdviceToDisease(diseaseId: number, adviceData: Partial<AdviceComment>): Promise<AdviceComment> {
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