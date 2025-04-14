import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { AdviceComment } from "../entities/AdviceComment";
import { ILike } from "typeorm";

export class AdviceCommentRepository {
  private repository: Repository<AdviceComment>;

  constructor() {
    this.repository = AppDataSource.getRepository(AdviceComment);
  }

  async findAll(): Promise<AdviceComment[]> {
    return this.repository.find({
      relations: ["plant", "disease"]
    });
  }

  async findById(id: number): Promise<AdviceComment | null> {
    return this.repository.findOne({
      where: { advice_id: id },
      relations: ["plant", "disease"]
    });
  }

  async create(adviceComment: Partial<AdviceComment>): Promise<AdviceComment> {
    const newAdviceComment = this.repository.create(adviceComment);
    return this.repository.save(newAdviceComment);
  }

  async update(id: number, adviceComment: Partial<AdviceComment>): Promise<AdviceComment | null> {
    await this.repository.update(id, adviceComment);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  async findByUser(userId: number): Promise<AdviceComment[]> {
    return this.repository.find({
      where: { user_id: userId },
      relations: ["plant", "disease"]
    });
  }

  async findByPlant(plantId: number): Promise<AdviceComment[]> {
    return this.repository.find({
      where: { plant: { plant_id: plantId } },
      relations: ["plant", "disease"]
    });
  }

  async findByDisease(diseaseId: number): Promise<AdviceComment[]> {
    return this.repository.find({
      where: { disease: { disease_id: diseaseId } },
      relations: ["plant", "disease"]
    });
  }

  async searchByTitle(title: string): Promise<AdviceComment[]> {
    return this.repository.find({
      where: { title: ILike(`%${title}%`) },
      relations: ["plant", "disease"]
    });
  }

  async searchByContent(content: string): Promise<AdviceComment[]> {
    return this.repository.find({
      where: { content: ILike(`%${content}%`) },
      relations: ["plant", "disease"]
    });
  }
} 