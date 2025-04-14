import { ReportRepository } from "../repositories/ReportRepository";
import { Report } from "../entities/Report";

export class ReportService {
  private reportRepository: ReportRepository;

  constructor() {
    this.reportRepository = new ReportRepository();
  }

  async getAllReports(): Promise<Report[]> {
    return this.reportRepository.findAll();
  }

  async getReportById(id: number): Promise<Report | null> {
    return this.reportRepository.findById(id);
  }

  async getReportsByUser(userId: number): Promise<Report[]> {
    return this.reportRepository.findByUser(userId);
  }

  async getReportsByPlant(plantId: number): Promise<Report[]> {
    return this.reportRepository.findByPlant(plantId);
  }

  async createReport(report: Partial<Report>): Promise<Report> {
    return this.reportRepository.create(report);
  }

  async updateReport(id: number, report: Partial<Report>): Promise<Report | null> {
    return this.reportRepository.update(id, report);
  }

  async deleteReport(id: number): Promise<boolean> {
    return this.reportRepository.delete(id);
  }
} 