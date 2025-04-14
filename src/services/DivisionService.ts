import { DivisionRepository } from "../repositories/DivisionRepository";
import { Division } from "../entities/Division";

export class DivisionService {
  private divisionRepository: DivisionRepository;

  constructor() {
    this.divisionRepository = new DivisionRepository();
  }

  async getAllDivisions(): Promise<Division[]> {
    return this.divisionRepository.findAll();
  }

  async getDivisionById(id: number): Promise<Division | null> {
    return this.divisionRepository.findById(id);
  }

  async createDivision(divisionData: Partial<Division>): Promise<Division> {
    return this.divisionRepository.create(divisionData);
  }

  async updateDivision(id: number, divisionData: Partial<Division>): Promise<Division | null> {
    return this.divisionRepository.update(id, divisionData);
  }

  async deleteDivision(id: number): Promise<boolean> {
    return this.divisionRepository.delete(id);
  }

  async searchDivisions(name: string): Promise<Division[]> {
    return this.divisionRepository.searchByName(name);
  }

  async validateDivisionData(divisionData: Partial<Division>): Promise<string[]> {
    const errors: string[] = [];

    if (!divisionData.name) {
      errors.push("Name is required");
    }

    return errors;
  }
} 