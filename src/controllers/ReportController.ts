import { Request, Response } from "express";
import { ReportService } from "../services/ReportService";
import { AuthRequest } from "../middleware/auth";

export class ReportController {
  private reportService: ReportService;

  constructor() {
    this.reportService = new ReportService();
  }

  async getAllReports(req: Request, res: Response): Promise<void> {
    try {
      const reports = await this.reportService.getAllReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reports" });
    }
  }

  async getReportById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const report = await this.reportService.getReportById(id);
      if (report) {
        res.json(report);
      } else {
        res.status(404).json({ message: "Report not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching report" });
    }
  }

  async createReport(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const report = await this.reportService.createReport({
        ...req.body,
        user: { User_ID: userId }
      });
      res.status(201).json(report);
    } catch (error) {
      res.status(500).json({ message: "Error creating report" });
    }
  }

  async updateReport(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const report = await this.reportService.updateReport(id, req.body);
      if (report) {
        res.json(report);
      } else {
        res.status(404).json({ message: "Report not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating report" });
    }
  }

  async deleteReport(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await this.reportService.deleteReport(id);
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Report not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting report" });
    }
  }

  async getReportsByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const reports = await this.reportService.getReportsByUser(userId);
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reports by user" });
    }
  }

  async getReportsByPlant(req: Request, res: Response): Promise<void> {
    try {
      const plantId = parseInt(req.params.plantId);
      const reports = await this.reportService.getReportsByPlant(plantId);
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reports by plant" });
    }
  }
} 