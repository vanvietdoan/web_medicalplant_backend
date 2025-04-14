import { FamilyRepository } from "../repositories/FamilyRepository";
import { Family } from "../entities/Family";

export class FamilyService {
  private familyRepository: FamilyRepository;

  constructor() {
    this.familyRepository = new FamilyRepository();
  }

  async getAllFamilies(): Promise<Family[]> {
    return this.familyRepository.findAll();
  }

  async getFamilyById(id: number): Promise<Family | null> {
    return this.familyRepository.findById(id);
  }

  async createFamily(familyData: Partial<Family>): Promise<Family> {
    return this.familyRepository.create(familyData);
  }

  async updateFamily(id: number, familyData: Partial<Family>): Promise<Family | null> {
    return this.familyRepository.update(id, familyData);
  }

  async deleteFamily(id: number): Promise<boolean> {
    return this.familyRepository.delete(id);
  }

  async getFamiliesByOrder(orderId: number): Promise<Family[]> {
    return this.familyRepository.findByOrder(orderId);
  }

  async searchFamilies(name: string): Promise<Family[]> {
    return this.familyRepository.searchByName(name);
  }

  async validateFamilyData(familyData: Partial<Family>): Promise<string[]> {
    const errors: string[] = [];

    if (!familyData.name) {
      errors.push("Name is required");
    }

    if (!familyData.order_id) {
      errors.push("Order ID is required");
    }

    return errors;
  }
} 