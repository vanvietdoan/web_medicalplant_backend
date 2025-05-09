import { Repository } from "typeorm";
import { Service } from "typedi";
import { AppDataSource } from "../config/database";
import { Report } from "../entities/Report";

@Service()
export class ReportRepository {
  private repository: Repository<Report>;

  constructor() {
    this.repository = AppDataSource.getRepository(Report);
  }

  public async findAll(): Promise<Report[]> {
    return this.repository.find({
      relations: ["plant"]
    });
  }

  public async findById(id: number): Promise<Report | null> {
    return this.repository.findOne({
      where: { report_id: id },
      relations: ["plant"]
    });
  }

  public async create(report: Partial<Report>): Promise<Report> {
    const newReport = this.repository.create(report);
    return this.repository.save(newReport);
  }

  public async update(id: number, report: Partial<Report>): Promise<Report | null> {
    await this.repository.update(id, report);
    return this.findById(id);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  public async findByUser(userId: number): Promise<Report[]> {
    return this.repository.find({
      where: { user_id: userId },
      relations: ["plant"]
    });
  }

  public async findByPlant(plantId: number): Promise<Report[]> {
    return this.repository.find({
      where: { plant_id: plantId },
      relations: ["plant"]
    });
  }
} 