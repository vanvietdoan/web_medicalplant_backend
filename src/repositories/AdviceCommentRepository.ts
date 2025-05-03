import { IsNull, Not, Repository } from "typeorm";
import { Service } from "typedi";
import { AppDataSource } from "../config/database";
import { AdviceComment } from "../entities/AdviceComment";
import { ILike } from "typeorm";
import { User } from "../entities/User";
import logger from "../utils/logger";

@Service()
export class AdviceCommentRepository {
  private repository: Repository<AdviceComment>;

  constructor() {
    this.repository = AppDataSource.getRepository(AdviceComment);
  }

  public async findAll(): Promise<AdviceComment[]> {
    return this.repository.find({
      relations: ["plant", "disease",'user']
    });
  }

  public async findUserMostAdvice(): Promise<{ user_id: number, total_advice: number }[]> {
    logger.info('Finding top 6 users with most advice comments');
    
    const result = await this.repository
      .createQueryBuilder('advice_comment')
      .select('advice_comment.user_id', 'user_id')
      .addSelect('COUNT(advice_comment.user_id)', 'total_advice')
      .groupBy('advice_comment.user_id')
      .orderBy('total_advice', 'DESC')
      .limit(4)
      .getRawMany();

    // Kiểm tra user có tồn tại không
    const userRepository = AppDataSource.getRepository(User);
    const validResults = await Promise.all(
      result.map(async (item) => {
        const user = await userRepository.findOne({
          where: { user_id: item.user_id }
        });
        if (!user) return null;
        return {
          user_id: item.user_id,
          total_advice: parseInt(item.total_advice)
        };
      })
    );

    // Lọc ra những kết quả null
    const filteredResults = validResults.filter(item => item !== null) as { user_id: number, total_advice: number }[];
    
    logger.info(`Found ${filteredResults.length} users with most advice comments`);
    return filteredResults;
  }

  public async findById(id: number): Promise<AdviceComment | null> {
    return this.repository.findOne({
      where: { advice_id: id },
      relations: ["plant", "disease",'user']
    });
  }

  public async create(adviceComment: Partial<AdviceComment>): Promise<AdviceComment> {
    const newAdviceComment = this.repository.create(adviceComment);
    return this.repository.save(newAdviceComment);
  }

  public async update(id: number, adviceComment: Partial<AdviceComment>): Promise<AdviceComment | null> {
    await this.repository.update(id, adviceComment);
    return this.findById(id);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  public async findByUser(userId: number): Promise<AdviceComment[]> {
    return this.repository.find({
      where: { user_id: userId },
      relations: ["plant", "disease",'user']
    });
  }

  public async findByPlant(plantId: number): Promise<AdviceComment[]> {
    return this.repository.find({
      where: { plant: { plant_id: plantId } },
      relations: ["plant", "disease",'user']
    });
  }

  public async findByDisease(diseaseId: number): Promise<AdviceComment[]> {
    return this.repository.find({
      where: { disease: { disease_id: diseaseId } },
      relations: ["plant", "disease",'user']
    });
  }

  public async searchByTitle(title: string): Promise<AdviceComment[]> {
    return this.repository.find({
      where: { title: ILike(`%${title}%`) },
      relations: ["plant", "disease",'user']
    });
  }

  public async searchByContent(content: string): Promise<AdviceComment[]> {
    return this.repository.find({
      where: { content: ILike(`%${content}%`) },
      relations: ["plant", "disease",'user']
    });
  }

  public async getAdviceCommentsByUser(userId: number): Promise<AdviceComment[]> {
    return this.repository.find({
      where: { user_id: userId },
      relations: ["plant", "disease", "user"]
    });
  }
} 