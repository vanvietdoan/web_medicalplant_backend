import { GenusRepository } from "../repositories/GenusRepository";
import { Genus } from "../entities/Genus";

export class GenusService {
  private genusRepository: GenusRepository;

  constructor() {
    this.genusRepository = new GenusRepository();
  }

  async getAllGenera(): Promise<Genus[]> {
    return this.genusRepository.findAll();
  }

  async getGenusById(id: number): Promise<Genus | null> {
    return this.genusRepository.findById(id);
  }

  async createGenus(genusData: Partial<Genus>): Promise<Genus> {
    return this.genusRepository.create(genusData);
  }

  async updateGenus(id: number, genusData: Partial<Genus>): Promise<Genus | null> {
    return this.genusRepository.update(id, genusData);
  }

  async deleteGenus(id: number): Promise<boolean> {
    return this.genusRepository.delete(id);
  }

  async getGeneraByFamily(familyId: number): Promise<Genus[]> {
    return this.genusRepository.findByFamily(familyId);
  }

  async searchGenera(name: string): Promise<Genus[]> {
    return this.genusRepository.searchByName(name);
  }

  async validateGenusData(genusData: Partial<Genus>): Promise<string[]> {
    const errors: string[] = [];

    if (!genusData.name) {
      errors.push("Name is required");
    }

    if (!genusData.family_id) {
      errors.push("Family ID is required");
    }

    return errors;
  }
} 