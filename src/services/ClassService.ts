import { ClassRepository } from "../repositories/ClassRepository";
import { Class } from "../entities/Class";

export class ClassService {
  private classRepository: ClassRepository;

  constructor() {
    this.classRepository = new ClassRepository();
  }

  async getAllClasses(): Promise<Class[]> {
    return this.classRepository.findAll();
  }

  async getClassById(id: number): Promise<Class | null> {
    return this.classRepository.findById(id);
  }

  async createClass(classData: Partial<Class>): Promise<Class> {
    return this.classRepository.create(classData);
  }

  async updateClass(id: number, classData: Partial<Class>): Promise<Class | null> {
    return this.classRepository.update(id, classData);
  }

  async deleteClass(id: number): Promise<boolean> {
    return this.classRepository.delete(id);
  }

  async getClassesByDivision(divisionId: number): Promise<Class[]> {
    return this.classRepository.findByDivision(divisionId);
  }

  async searchClasses(name: string): Promise<Class[]> {
    return this.classRepository.searchByName(name);
  }

  async validateClassData(classData: Partial<Class>): Promise<string[]> {
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