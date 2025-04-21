import { Service } from "typedi";
import { ClassRepository } from "../repositories/ClassRepository";
import { Class } from "../entities/Class";
import { IClassResponse } from "../interfaces/IClass";

@Service()
export class ClassService {
  private classRepository: ClassRepository;

  constructor() {
    this.classRepository = new ClassRepository();
  }

  private formatClassResponse(classData: Class): IClassResponse {
    return {
      created_at: classData.created_at,
      updated_at: classData.updated_at,
      class_id: classData.class_id,
      name: classData.name,
      division_id: classData.division_id
    };
  }

  public async getAllClasses(): Promise<IClassResponse[]> {
    const classes = await this.classRepository.findAll();
    return classes.map(this.formatClassResponse);
  }

  public async getClassById(id: number): Promise<IClassResponse | null> {
    const classData = await this.classRepository.findById(id);
    return classData ? this.formatClassResponse(classData) : null;
  }

  public async createClass(classData: Partial<Class>): Promise<Class> {
    return this.classRepository.create(classData);
  }

  public async updateClass(id: number, classData: { name: string; divisio_id: number }): Promise<Class | null> {
    return this.classRepository.update(id, classData);
  }

  public async deleteClass(id: number): Promise<boolean> {
    return this.classRepository.delete(id);
  }

  public async getClassesByDivision(divisionId: number): Promise<IClassResponse[]> {
    const classes = await this.classRepository.findByDivision(divisionId);
    return classes.map(this.formatClassResponse);
  }

  public async searchClasses(name: string): Promise<IClassResponse[]> {
    const classes = await this.classRepository.searchByName(name);
    return classes.map(this.formatClassResponse);
  }

  public async validateClassData(classData: Partial<Class>): Promise<string[]> {
    const errors: string[] = [];

    if (!classData.name) {
      errors.push("Name is required");
    }

    if (!classData.division_id) {
      errors.push("Division ID is required");
    }

    return errors;
  }
} 