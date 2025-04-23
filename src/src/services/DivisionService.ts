import { Service } from "typedi";
import { DivisionRepository } from "../repositories/DivisionRepository";
import { Division } from "../entities/Division";

@Service()
export class DivisionService {
  private divisionRepository: DivisionRepository;

  constructor() {
    this.divisionRepository = new DivisionRepository();
  }

  public async getAllDivisions(): Promise<Division[]> {
    return this.divisionRepository.findAll();
  }

  public async getDivisionById(id: number): Promise<Division | null> {
    return this.divisionRepository.findById(id);
  }

  public async createDivision(divisionData: Partial<Division>): Promise<Division> {
    return this.divisionRepository.create(divisionData);
  }

  public async updateDivision(id: number, divisionData: Partial<Division>): Promise<Division | null> {
    return this.divisionRepository.update(id, divisionData);
  }

  public async deleteDivision(id: number): Promise<boolean> {
    return this.divisionRepository.delete(id);
  }

  public async searchDivisions(name: string): Promise<Division[]> {
    return this.divisionRepository.searchByName(name);
  }

  public async validateDivisionData(divisionData: Partial<Division>): Promise<string[]> {
    const errors: string[] = [];

    if (!divisionData.name) {
      errors.push("Name is required");
    }

    return errors;
  }
} 