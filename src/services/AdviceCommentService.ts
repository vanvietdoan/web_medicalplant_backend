import { AdviceCommentRepository } from "../repositories/AdviceCommentRepository";
import { IAdviceComment } from "../interfaces/IAdviceComment";

export class AdviceCommentService {
  private adviceCommentRepository: AdviceCommentRepository;

  constructor() {
    this.adviceCommentRepository = new AdviceCommentRepository();
  }

  async getAllAdviceComments(): Promise<IAdviceComment[]> {
    return this.adviceCommentRepository.findAll();
  }

  async getAdviceCommentById(id: number): Promise<IAdviceComment | null> {
    return this.adviceCommentRepository.findById(id);
  }

  async getAdviceCommentsByUser(userId: number): Promise<IAdviceComment[]> {
    return this.adviceCommentRepository.findByUser(userId);
  }

  async getAdviceCommentsByPlant(plantId: number): Promise<IAdviceComment[]> {
    return this.adviceCommentRepository.findByPlant(plantId);
  }

  async getAdviceCommentsByDisease(diseaseId: number): Promise<IAdviceComment[]> {
    return this.adviceCommentRepository.findByDisease(diseaseId);
  }

  async createAdviceComment(adviceComment: Partial<IAdviceComment>): Promise<IAdviceComment> {
    return this.adviceCommentRepository.create(adviceComment);
  }

  async updateAdviceComment(id: number, adviceComment: Partial<IAdviceComment>): Promise<IAdviceComment | null> {
    return this.adviceCommentRepository.update(id, adviceComment);
  }

  async deleteAdviceComment(id: number): Promise<boolean> {
    return this.adviceCommentRepository.delete(id);
  }

  async searchByTitle(title: string): Promise<IAdviceComment[]> {
    return this.adviceCommentRepository.searchByTitle(title);
  }

  async searchByContent(content: string): Promise<IAdviceComment[]> {
    return this.adviceCommentRepository.searchByContent(content);
  }
} 