import { Service } from "typedi";
import { UserReportRepository } from "../repositories/UserReportRepository";
import { UserReport } from "../entities/UserReport";
import { IUserReport, IUserReportResponse } from '../interfaces/IUserReport';

@Service()
export class UserReportService {
  constructor(
    private userReportRepository: UserReportRepository
  ) {}

  public async getAllUserReports(): Promise<IUserReportResponse[]> {
    const userReports = await this.userReportRepository.findAll();
    return userReports.map(userReport => this.mapUserReportResponse(userReport));
  }


  public async getUserReportsByUserId(userId: number): Promise<IUserReportResponse[]> {
    const userReports = await this.userReportRepository.findByUserId(userId);
    return userReports.map(userReport => this.mapUserReportResponse(userReport));
  }

  public async getUserReportsByReportId(reportId: number): Promise<IUserReportResponse[]> {
    const userReports = await this.userReportRepository.findByReportId(reportId);
    return userReports.map(userReport => this.mapUserReportResponse(userReport));
  }

  public async createUserReport(userReportData: Partial<IUserReport>): Promise<IUserReportResponse> {
    const userReport = await this.userReportRepository.create(userReportData);
    return this.mapUserReportResponse(userReport);
  }

  public async updateUserReport(id: number, userReportData: Partial<IUserReport>): Promise<IUserReportResponse> {
    const existingUserReport = await this.userReportRepository.findById(id);
    if (!existingUserReport) {
      throw new Error('User report not found');
    }

    const updatedUserReport = await this.userReportRepository.update(id, userReportData);
    return this.mapUserReportResponse(updatedUserReport);
  }

  public async deleteUserReport(id: number): Promise<boolean> {
    return this.userReportRepository.delete(id);
  }

  private mapUserReportResponse(userReport: UserReport): IUserReportResponse {
    return {
      user_report_id: userReport.user_report_id,
      user_id: userReport.user_id,
      report_id: userReport.report_id,
      created_at: userReport.created_at,
      updated_at: userReport.updated_at
    };
  }
}