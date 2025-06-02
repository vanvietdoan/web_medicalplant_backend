import { Repository } from "typeorm";
import { Service } from "typedi";
import { AppDataSource } from "../config/database";
import { Notify } from "../entities/Notify";
import logger from "../utils/logger";
import { In } from "typeorm";

@Service()
export class NotifyRepository {
  private repository: Repository<Notify>;

  constructor() {
    this.repository = AppDataSource.getRepository(Notify);
  }

  public async findById(id: number): Promise<Notify | null> {
    logger.info(`Finding notification with id: ${id}`);
    return this.repository.findOne({
      where: { notify_id: id }
    });
  }

  public async create(notify: Partial<Notify>): Promise<Notify> {
    logger.info('Creating new notification');
    const newNotify = this.repository.create(notify);
    return this.repository.save(newNotify);
  }

  public async findByUserId(userId: number): Promise<Notify[]> {
    logger.info(`Finding notifications for user with id: ${userId}`);
    return this.repository.find({
      where: { user_id: userId },
      order: {
        created_at: 'DESC'
      }
    });
  }

  public async update(id: number, notify: Partial<Notify>): Promise<Notify | null> {
    logger.info(`Updating notification with id: ${id}`);
    await this.repository.update(id, notify);
    return this.findById(id);
  }

  public async delete(id: number): Promise<boolean> {
    logger.info(`Deleting notification with id: ${id}`);
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
} 