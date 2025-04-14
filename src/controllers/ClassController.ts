import { Request, Response } from "express";
import { ClassService } from "../services/ClassService";
import { Class } from "../entities/Class";

export class ClassController {
  private classService: ClassService;

  constructor() {
    this.classService = new ClassService();
  }

  async getAllClasses(req: Request, res: Response): Promise<void> {
    try {
      const classes = await this.classService.getAllClasses();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: "Error fetching classes", error });
    }
  }

  async getClassById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const class_ = await this.classService.getClassById(id);
      
      if (!class_) {
        res.status(404).json({ message: "Class not found" });
        return;
      }
      
      res.json(class_);
    } catch (error) {
      res.status(500).json({ message: "Error fetching class", error });
    }
  }

  async createClass(req: Request, res: Response): Promise<void> {
    try {
      const classData = req.body;
      
      // Validate input data
      const validationErrors = await this.classService.validateClassData(classData);
      if (validationErrors.length > 0) {
        res.status(400).json({ message: "Validation failed", errors: validationErrors });
        return;
      }

      const class_ = await this.classService.createClass(classData);
      res.status(201).json(class_);
    } catch (error) {
      res.status(500).json({ message: "Error creating class", error });
    }
  }

  async updateClass(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const classData = req.body;
      
      // Validate input data
      const validationErrors = await this.classService.validateClassData(classData);
      if (validationErrors.length > 0) {
        res.status(400).json({ message: "Validation failed", errors: validationErrors });
        return;
      }

      const class_ = await this.classService.updateClass(id, classData);
      
      if (!class_) {
        res.status(404).json({ message: "Class not found" });
        return;
      }
      
      res.json(class_);
    } catch (error) {
      res.status(500).json({ message: "Error updating class", error });
    }
  }

  async deleteClass(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.classService.deleteClass(id);
      
      if (!success) {
        res.status(404).json({ message: "Class not found" });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting class", error });
    }
  }

  async getClassesByDivision(req: Request, res: Response): Promise<void> {
    try {
      const divisionId = parseInt(req.params.divisionId);
      const classes = await this.classService.getClassesByDivision(divisionId);
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: "Error fetching classes by division", error });
    }
  }

  async searchClasses(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.query;
      
      if (!name || typeof name !== 'string') {
        res.status(400).json({ message: "Search name is required" });
        return;
      }

      const classes = await this.classService.searchClasses(name);
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: "Error searching classes", error });
    }
  }
} 