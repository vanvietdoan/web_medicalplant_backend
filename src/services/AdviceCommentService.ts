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

  constructor() {
    this.adviceCommentRepository = new AdviceCommentRepository();
  }

  public async getAllAdviceComments(): Promise<any[]> {
    logger.info('Service getAllAdviceComments');
    return this.adviceCommentRepository.findAll();
    

  }

  public async getAdviceCommentById(id: number): Promise<any | null> {
    const comment = await this.adviceCommentRepository.findById(id);
    if (!comment) return null;
    logger.info('Service getAdviceCommentById', comment);
    return {
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      title: comment.title,
      content: comment.content,
      plant: {
        plant_id: comment.plant.plant_id,
        name: comment.plant.name
      },
      disease: {
        disease_id: comment.disease.disease_id,
        name: comment.disease.name
      },
      user: {
        user_id: comment.user.user_id,
        full_name: comment.user.full_name,
        title: comment.user.title
      }
    };
  }

  public async getAdviceCommentsByUser(userId: number): Promise<any[]> {
    const adviceComments = await this.adviceCommentRepository.findByUser(userId);
    return adviceComments.map(comment => ({
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      title: comment.title,
      content: comment.content,
      plant: {
        plant_id: comment.plant.plant_id,
        name: comment.plant.name
      },
      disease: {
        disease_id: comment.disease.disease_id,
        name: comment.disease.name
      },
      user: {
        user_id: comment.user.user_id,
        full_name: comment.user.full_name,
        title: comment.user.title
      }
    }));
  }

  public async getAdviceCommentsByPlant(plantId: number): Promise<any[]> {
    let adviceComments = await this.adviceCommentRepository.findByPlant(plantId);
    console.log("adviceComments service: ", adviceComments);
    if (!adviceComments) {
      return [];
    }
    return adviceComments.map(comment => ({
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      title: comment.title,
      content: comment.content,
      plant: {
        plant_id: comment.plant?.plant_id,
        name: comment.plant?.name
      },
      disease: {
        disease_id: comment.disease?.disease_id,
        name: comment.disease?.name
      },
      user: {
        user_id: comment.user?.user_id,
        full_name: comment.user?.full_name,
        title: comment.user?.title
      }
    }));
  }

  public async getAdviceCommentsByDisease(diseaseId: number): Promise<any[]> {
    const adviceComments = await this.adviceCommentRepository.findByDisease(diseaseId);
    if (!adviceComments) {
      return [];
    }
    return adviceComments.map(comment => ({
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      title: comment.title,
      content: comment.content,
      plant: {
        plant_id: comment.plant?.plant_id,
        name: comment.plant?.name
      },
      disease: {
        disease_id: comment.disease?.disease_id,
        name: comment.disease?.name
      },
      user: {
        user_id: comment.user?.user_id,
        full_name: comment.user?.full_name,
        title: comment.user?.title
      }
    }));
  }

  public async createAdviceComment(adviceComment: IAdviceCommentRequest): Promise<any> {
    const newAdviceComment = await this.adviceCommentRepository.create(adviceComment);
    const createdComment = await this.adviceCommentRepository.findById(newAdviceComment.advice_id);
    
    if (!createdComment) {
      throw new Error("Failed to create advice comment");
    }

    return {
      created_at: createdComment.created_at,
      updated_at: createdComment.updated_at,
      title: createdComment.title,
      content: createdComment.content,
      plant: {
        plant_id: createdComment.plant.plant_id,
        name: createdComment.plant.name
      },
      disease: {
        disease_id: createdComment.disease.disease_id,
        name: createdComment.disease.name
      },
      user: {
        user_id: createdComment.user.user_id,
        full_name: createdComment.user.full_name,
        title: createdComment.user.title
      }
    };
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