import { Service } from "typedi";
import { ReportRepository } from "../repositories/ReportRepository";
import { Report } from "../entities/Report";
import { IReportResponse } from "../interfaces/IReport";
import { IReport } from "../interfaces/IReport";

@Service()
export class ReportService {
  constructor(
    private reportRepository: ReportRepository
  ) {}

  public async getAllReports(): Promise<IReportResponse[]> {
    const reports = await this.reportRepository.findAll();
    return reports.map(report => this.mapReportResponse(report));
  }

  public async getReportById(id: number): Promise<IReportResponse | null> {
    const report = await this.reportRepository.findById(id);
    if (!report) return null;
    return this.mapReportResponse(report);
  }

  public async getReportsByUser(userId: number): Promise<Report[]> {
    return this.reportRepository.findByUser(userId);
  }


  public async getReportsByPlant(plantId: number): Promise<Report[]> {
    return this.reportRepository.findByPlant(plantId);
  }

  public async createReport(reportData: Partial<IReport>): Promise<IReportResponse> {
    const report = await this.reportRepository.create(reportData);
    return this.mapReportResponse(report);
  }

  public async updateReport(id: number, reportData: Partial<IReport>): Promise<IReportResponse | null> {
    const report = await this.reportRepository.update(id, reportData);
    if (!report) return null;
    return this.mapReportResponse(report);
  }

  public async deleteReport(id: number): Promise<boolean> {
    return this.reportRepository.delete(id);
  }

  private mapReportResponse(report: Report): IReportResponse {
    return {
      plant_name: report.plant_name,
      plant_english_name: report.plant_english_name,
      plant_description: report.plant_description,
      plant_instructions: report.plant_instructions,
      plant_benefits: report.plant_benefits,
      plant_species_id: report.plant_species_id,
      report_id: report.report_id,
      propose: report.propose,
      summary: report.summary,
      status: report.status,
      proof: report.proof,
      plant_id: report.plant_id,
      user_id: report.user_id,
      created_at: report.created_at,
      updated_at: report.updated_at
    };
  }
}