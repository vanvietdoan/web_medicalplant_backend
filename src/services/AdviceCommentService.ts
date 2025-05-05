import { AdviceCommentRepository } from "../repositories/AdviceCommentRepository";
import { IAdviceComment } from "../interfaces/IAdviceComment";
import { Service } from "typedi";
import { AdviceComment } from '../entities/AdviceComment';
import { User } from "../entities/User";
import { IAdviceCommentRequest } from "../interfaces/IAdviceComment";
import logger from "../utils/logger";
@Service()
export class AdviceCommentService {
  private adviceCommentRepository: AdviceCommentRepository;
  private host: string = '';

  constructor() {
    this.adviceCommentRepository = new AdviceCommentRepository();
  }

  public setHost(host: string) {
    this.host = host;
  }

  private formatUrl(path: string | undefined | null): string | null {
    if (!path) return null;
    return `${this.host}/${path}`;
  }

  private mapCommentResponse(comment: AdviceComment) {
    return {
      advice_id: comment.advice_id,
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      title: comment.title,
      content: comment.content,
      plant: comment.plant ? {
        plant_id: comment.plant.plant_id,
        name: comment.plant.name
      } : null,
      disease: comment.disease ? {
        disease_id: comment.disease.disease_id,
        name: comment.disease.name
      } : null,
      user: comment.user ? {
        user_id: comment.user.user_id,
        full_name: comment.user.full_name,
        title: comment.user.title,
        avatar: this.formatUrl(comment.user.avatar)
      } : null
    };
  }

  public async getAllAdviceComments(): Promise<any[]> {
    logger.info('Service getAllAdviceComments');
    const adviceComments = await this.adviceCommentRepository.findAll();
    return adviceComments.map(comment => this.mapCommentResponse(comment));
  }

  public async getUsersWithMostAdvice(): Promise<any[]> {
    logger.info('Service getUsersWithMostAdvice');
    const users = await this.adviceCommentRepository.findUserMostAdvice();
    return users.map(user => ({
      user_id: user.user_id,
      total_advice: user.total_advice,
    }));
  }

  public async getAdviceCommentById(id: number): Promise<any | null> {
    const comment = await this.adviceCommentRepository.findById(id);
    if (!comment) return null;
    return this.mapCommentResponse(comment);
  }

  public async getAdviceCommentsByUser(userId: number): Promise<any[]> {
    const comments = await this.adviceCommentRepository.findByUser(userId);
    return comments.map(comment => this.mapCommentResponse(comment));
  }

  public async getAdviceCommentsByPlant(plantId: number): Promise<any[]> {
    const comments = await this.adviceCommentRepository.findByPlant(plantId);
    return comments.map(comment => this.mapCommentResponse(comment));
  }

  public async getAdviceCommentsByDisease(diseaseId: number): Promise<any[]> {
    const comments = await this.adviceCommentRepository.findByDisease(diseaseId);
    return comments.map(comment => this.mapCommentResponse(comment));
  }

  public async createAdviceComment(adviceComment: IAdviceCommentRequest): Promise<any> {
    const newAdviceComment = await this.adviceCommentRepository.create(adviceComment);
    const createdComment = await this.adviceCommentRepository.findById(newAdviceComment.advice_id);
    
    if (!createdComment) {
      throw new Error("Failed to create advice comment");
    }

    return this.mapCommentResponse(createdComment);
  }

  public async updateAdviceComment(id: number, adviceComment: Partial<IAdviceComment>): Promise<any | null> {
    const updatedComment = await this.adviceCommentRepository.update(id, adviceComment);
    if (!updatedComment) return null;
    return this.mapCommentResponse(updatedComment);
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