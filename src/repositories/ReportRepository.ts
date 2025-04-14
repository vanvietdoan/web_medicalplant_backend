import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Report } from "../entities/Report";

export class ReportRepository {
  private repository: Repository<Report>;

  constructor() {
    this.repository = AppDataSource.getRepository(Report);
  }

  async findAll(): Promise<Report[]> {
    return this.repository.find({
      relations: ["plant", "user", "user_reports"]
    });
  }

  async findById(id: number): Promise<Report | null> {
    return this.repository.findOne({
      where: { report_id: id },
      relations: ["plant", "user", "user_reports"]
    });
  }

  async create(report: Partial<Report>): Promise<Report> {
    const newReport = this.repository.create(report);
    return this.repository.save(newReport);
  }

  async update(id: number, report: Partial<Report>): Promise<Report | null> {
    await this.repository.update(id, report);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  async findByUser(userId: number): Promise<Report[]> {
    return this.repository.find({
      where: { user: { user_id: userId } },
      relations: ["plant", "user", "user_reports"]
    });
  }

  async findByPlant(plantId: number): Promise<Report[]> {
    return this.repository.find({
      where: { plant: { plant_id: plantId } },
      relations: ["plant", "user", "user_reports"]
    });
  }
} 