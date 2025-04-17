import { Service } from "typedi";
import { ClassRepository } from "../repositories/ClassRepository";
import { Class } from "../entities/Class";

@Service()
export class ClassService {
  private classRepository: ClassRepository;

  constructor() {
    this.classRepository = new ClassRepository();
  }

  public async getAllClasses(): Promise<Class[]> {
    return this.classRepository.findAll();
  }

  public async getClassById(id: number): Promise<Class | null> {
    return this.classRepository.findById(id);
  }

  public async createClass(classData: Partial<Class>): Promise<Class> {
    return this.classRepository.create(classData);
  }

  public async updateClass(id: number, classData: Partial<Class>): Promise<Class | null> {
    return this.classRepository.update(id, classData);
  }

  public async deleteClass(id: number): Promise<boolean> {
    return this.classRepository.delete(id);
  }

  public async getClassesByDivision(divisionId: number): Promise<Class[]> {
    return this.classRepository.findByDivision(divisionId);
  }

  public async searchClasses(name: string): Promise<Class[]> {
    return this.classRepository.searchByName(name);
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