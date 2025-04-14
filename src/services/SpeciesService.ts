import { SpeciesRepository } from "../repositories/SpeciesRepository";
import { Species } from "../entities/Species";

export class SpeciesService {
  private speciesRepository: SpeciesRepository;

  constructor() {
    this.speciesRepository = new SpeciesRepository();
  }

  async getAllSpecies(): Promise<Species[]> {
    return this.speciesRepository.findAll();
  }

  async getSpeciesById(id: number): Promise<Species | null> {
    return this.speciesRepository.findById(id);
  }

  async createSpecies(speciesData: Partial<Species>): Promise<Species> {
    return this.speciesRepository.create(speciesData);
  }

  async updateSpecies(id: number, speciesData: Partial<Species>): Promise<Species | null> {
    return this.speciesRepository.update(id, speciesData);
  }

  async deleteSpecies(id: number): Promise<boolean> {
    return this.speciesRepository.delete(id);
  }

  async getSpeciesByGenus(genusId: number): Promise<Species[]> {
    return this.speciesRepository.findByGenus(genusId);
  }

  async searchSpecies(name: string): Promise<Species[]> {
    return this.speciesRepository.searchByName(name);
  }

  async validateSpeciesData(speciesData: Partial<Species>): Promise<string[]> {
    const errors: string[] = [];

    if (!speciesData.name) {
      errors.push("Name is required");
    }

    if (!speciesData.genus_id) {
      errors.push("Genus ID is required");
    }

    return errors;
  }
} 