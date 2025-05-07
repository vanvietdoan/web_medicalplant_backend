import { Repository } from "typeorm";
import { Service } from "typedi";
import { AppDataSource } from "../config/database";
import { UserReport } from "../entities/UserReport";
import { IUserReport } from "../interfaces/IUserReport";

@Service()
export class UserReportRepository {
  private repository: Repository<UserReport>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserReport);
  }

  public async findAll(): Promise<UserReport[]> {
    return this.repository.find({
      relations: ["user", "report"]
    });
  }

  public async findByUserId(userId: number): Promise<UserReport[]> {
    return this.repository.find({
      where: { user_id: userId },
      relations: ["user", "report"]
    });
  }

  public async findByReportId(reportId: number): Promise<UserReport[]> {
    return this.repository.find({
      where: { report_id: reportId },
      relations: ["user", "report"]
    });
  }

  public async findById(id: number): Promise<UserReport | null> {
    return this.repository.findOne({
      where: { user_report_id: id },
      relations: ["user", "report"]
    });
  }

  public async create(userReportData: Partial<IUserReport>): Promise<UserReport> {
    const userReport = this.repository.create(userReportData);
    return this.repository.save(userReport);
  }

  public async update(id: number, userReportData: Partial<IUserReport>): Promise<UserReport> {
    await this.repository.update(id, userReportData);
    const updatedUserReport = await this.findById(id);
    if (!updatedUserReport) {
      throw new Error('Failed to update user report');
    }
    return updatedUserReport;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  public async findByUser(): Promise<UserReport[]> {
    return this.repository.find({
      where: { },
      relations: ["reports", "user"]
    });
  }
}