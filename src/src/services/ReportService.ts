import { Service } from "typedi";
import { ReportRepository } from "../repositories/ReportRepository";
import { Report } from "../entities/Report";

@Service()
export class ReportService {
  private reportRepository: ReportRepository;

  constructor() {
    this.reportRepository = new ReportRepository();
  }

  public async getAllReports(): Promise<Report[]> {
    return this.reportRepository.findAll();
  }

  public async getReportById(id: number): Promise<Report | null> {
    return this.reportRepository.findById(id);
  }

  public async getReportsByUser(userId: number): Promise<Report[]> {
    return this.reportRepository.findByUser(userId);
  }

  public async getReportsByPlant(plantId: number): Promise<Report[]> {
    return this.reportRepository.findByPlant(plantId);
  }

  public async createReport(report: Partial<Report>): Promise<Report> {
    return this.reportRepository.create(report);
  }

  public async updateReport(id: number, report: Partial<Report>): Promise<Report | null> {
    return this.reportRepository.update(id, report);
  }

  public async deleteReport(id: number): Promise<boolean> {
    return this.reportRepository.delete(id);
  }
} 