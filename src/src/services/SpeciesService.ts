import { Service } from "typedi";
import { SpeciesRepository } from "../repositories/SpeciesRepository";
import { Species } from "../entities/Species";

@Service()
export class SpeciesService {
  private speciesRepository: SpeciesRepository;

  constructor() {
    this.speciesRepository = new SpeciesRepository();
  }

  public async getAllSpecies(): Promise<Species[]> {
    return this.speciesRepository.findAll();
  }

  public async getSpeciesById(id: number): Promise<Species | null> {
    return this.speciesRepository.findById(id);
  }

  public async createSpecies(speciesData: Partial<Species>): Promise<Species> {
    return this.speciesRepository.create(speciesData);
  }

  public async updateSpecies(id: number, speciesData: Partial<Species>): Promise<Species | null> {
    return this.speciesRepository.update(id, speciesData);
  }

  public async deleteSpecies(id: number): Promise<boolean> {
    return this.speciesRepository.delete(id);
  }

  public async getSpeciesByGenus(genusId: number): Promise<Species[]> {
    return this.speciesRepository.findByGenus(genusId);
  }

  public async searchSpecies(name: string): Promise<Species[]> {
    return this.speciesRepository.searchByName(name);
  }

  public async validateSpeciesData(speciesData: Partial<Species>): Promise<string[]> {
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