import { Request, Response } from "express";
import { Service } from "typedi";
import { ReportService } from "../services/ReportService";
import { AuthRequest } from "../middleware/auth";

@Service()
export class ReportController {
  constructor(
    private reportService: ReportService
  ) {}


  async getAllReports(req: Request, res: Response): Promise<void> {
    try {
      const reports = await this.reportService.getAllReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reports" }); return;
    }
  }

  async getReportById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const report = await this.reportService.getReportById(id);
      if (report) {
        res.json(report);
      } else {
        res.status(404).json({ message: "Report not found" }); return;
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching report" }); return;
    }
  }

  async createReport(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" }); return;
        return;
      }

      const report = await this.reportService.createReport({
        ...req.body,
        user: { User_ID: userId }
      });
      res.status(201).json(report); return;
    } catch (error) {
      res.status(500).json({ message: "Error creating report" }); return;
    }
  }

  async updateReport(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const report = await this.reportService.updateReport(id, req.body);
      if (report) {
        res.json(report);
      } else {
        res.status(404).json({ message: "Report not found" }); return;
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating report" }); return;
    }
  }

  async deleteReport(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await this.reportService.deleteReport(id);
      if (result) {
        res.status(204).send(); return;
      } else {
        res.status(404).json({ message: "Report not found" }); return;
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting report" }); return;
    }
  }

 

  async getReportsByPlant(req: Request, res: Response): Promise<void> {
    try {
      const plantId = parseInt(req.params.plantId);
      const reports = await this.reportService.getReportsByPlant(plantId);
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reports by plant" }); return;
    }
  }
} 