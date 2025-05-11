import { Request, Response } from "express";
import { Service } from "typedi";
import logger from "../utils/logger";
import { EvalueService } from "../services/EvalueService";

@Service()
export class EvalueController {
  constructor(
    private evalueService: EvalueService
  ) {}

  private setHost(req: Request) { 
    const host = `${req.protocol}://${req.get('host')}`;
    logger.info(`Setting host in EvalueController: ${host}`);
    this.evalueService.setHost(host);
  }

  public async getEvalues(req: Request, res: Response): Promise<void> {
    try {
      this.setHost(req);
      const evalues = await this.evalueService.findAll();
      res.status(200).json(evalues);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getEvalueById(req: Request, res: Response): Promise<void> {
    try {
      this.setHost(req);
      const id = Number(req.params.id);
      const evalue = await this.evalueService.findById(id);
      
      if (!evalue) {
        res.status(404).json({ message: "Evalue not found" });
        return;
      }
      
      res.status(200).json(evalue);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getEvalueByAdviceId(req: Request, res: Response): Promise<void> {
    try { 
      this.setHost(req);
      const id = Number(req.params.id);
      const evalue = await this.evalueService.getbyAdviceId(id);
      
      if (!evalue) {
        res.status(404).json({ message: "Evalue not found" });
        return;
      }
      
      res.status(200).json(evalue);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getEvalueByUserId(req: Request, res: Response): Promise<void> {
    try { 
      this.setHost(req);
      const id = Number(req.params.id);
      const evalue = await this.evalueService.getbyUserId(id);
      
      if (!evalue) {
        res.status(404).json({ message: "Evalue not found" });
        return;
      }
      
      res.status(200).json(evalue);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async createEvalue(req: Request, res: Response): Promise<void> {
    try {
      this.setHost(req);
      const evalue = await this.evalueService.create(req.body);
      res.status(201).json(evalue);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async updateEvalue(req: Request, res: Response): Promise<void> {
    try {
      this.setHost(req);
      const id = Number(req.params.id);
      const evalue = await this.evalueService.update(id, req.body);
      
      if (!evalue) {
        res.status(404).json({ message: "Evalue not found" });
        return;
      }
      
      res.status(200).json(evalue);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async deleteEvalue(req: Request, res: Response): Promise<void> {
    try {
      this.setHost(req);
      const id = Number(req.params.id);
      const success = await this.evalueService.delete(id);
      
      if (!success) {
        res.status(404).json({ message: "Evalue not found" });
        return;
      }
      
      res.status(200).json({ message: "Evalue deleted" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}