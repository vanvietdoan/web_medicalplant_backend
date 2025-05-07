import { Service } from 'typedi';
import { Request, Response } from 'express';
import { UserReportService } from '../services/UserReportService';
import { IUserReport } from '../interfaces/IUserReport';
import { Container } from 'typedi';

@Service()
export class User_ReportController {
  private userReportService: UserReportService;

  constructor() {
    this.userReportService = Container.get(UserReportService);
  }

  public async getAllUserReports(req: Request, res: Response): Promise<void> {
    try {
      const userReports = await this.userReportService.getAllUserReports();
      res.status(200).json(userReports);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getUserReportsByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const userReports = await this.userReportService.getUserReportsByUserId(userId);
      res.status(200).json(userReports);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getUserReportsByReportId(req: Request, res: Response): Promise<void> {
    try {
      const reportId = Number(req.params.reportId);
      const userReports = await this.userReportService.getUserReportsByReportId(reportId);
      res.status(200).json(userReports);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async createUserReport(req: Request, res: Response): Promise<void> {
    try {
      const userReport = await this.userReportService.createUserReport(req.body);
      res.status(201).json(userReport);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async updateUserReport(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const userReport = await this.userReportService.updateUserReport(id, req.body);
      res.json(userReport);
    } catch (error) {
      if (error instanceof Error && error.message === 'User report not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error updating user report", error });
      }
    }
  }

  public async deleteUserReport(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const success = await this.userReportService.deleteUserReport(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "User report not found" });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
} 