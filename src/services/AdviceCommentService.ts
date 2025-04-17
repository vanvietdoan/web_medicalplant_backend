import { AdviceCommentRepository } from "../repositories/AdviceCommentRepository";
import { IAdviceComment } from "../interfaces/IAdviceComment";
import { Service } from "typedi";

@Service()
export class AdviceCommentService {
  private adviceCommentRepository: AdviceCommentRepository;

  constructor() {
    this.adviceCommentRepository = new AdviceCommentRepository();
  }

  public async getAllAdviceComments(): Promise<IAdviceComment[]> {
    return this.adviceCommentRepository.findAll();
  }

  public async getAdviceCommentById(id: number): Promise<IAdviceComment | null> {
    return this.adviceCommentRepository.findById(id);
  }

  public async getAdviceCommentsByUser(userId: number): Promise<IAdviceComment[]> {
    return this.adviceCommentRepository.findByUser(userId);
  }

  public async getAdviceCommentsByPlant(plantId: number): Promise<IAdviceComment[]> {
    return this.adviceCommentRepository.findByPlant(plantId);
  }

  public async getAdviceCommentsByDisease(diseaseId: number): Promise<IAdviceComment[]> {
    return this.adviceCommentRepository.findByDisease(diseaseId);
  }

  public async createAdviceComment(adviceComment: Partial<IAdviceComment>): Promise<IAdviceComment> {
    return this.adviceCommentRepository.create(adviceComment);
  }

  public async updateAdviceComment(id: number, adviceComment: Partial<IAdviceComment>): Promise<IAdviceComment | null> {
    return this.adviceCommentRepository.update(id, adviceComment);
  }

  public async deleteAdviceComment(id: number): Promise<boolean> {
    return this.adviceCommentRepository.delete(id);
  }

  public async searchByTitle(title: string): Promise<IAdviceComment[]> {
    return this.adviceCommentRepository.searchByTitle(title);
  }

  public async searchByContent(content: string): Promise<IAdviceComment[]> {
    return this.adviceCommentRepository.searchByContent(content);
  }
} 