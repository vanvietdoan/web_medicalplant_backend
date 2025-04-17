import { GenusRepository } from "../repositories/GenusRepository";
import { Genus } from "../entities/Genus";
import { Service } from "typedi";

@Service()
export class GenusService {
  private genusRepository: GenusRepository;

  constructor() {
    this.genusRepository = new GenusRepository();
  }

  public async getAllGenera(): Promise<Genus[]> {
    return this.genusRepository.findAll();
  }

  public async getGenusById(id: number): Promise<Genus | null> {
    return this.genusRepository.findById(id);
  }

  public async createGenus(genusData: Partial<Genus>): Promise<Genus> {
    return this.genusRepository.create(genusData);
  }

  public async updateGenus(id: number, genusData: Partial<Genus>): Promise<Genus | null> {
    return this.genusRepository.update(id, genusData);
  }

  public async deleteGenus(id: number): Promise<boolean> {
    return this.genusRepository.delete(id);
  }

  public async getGeneraByFamily(familyId: number): Promise<Genus[]> {
    return this.genusRepository.findByFamily(familyId);
  }

  public async searchGenera(name: string): Promise<Genus[]> {
    return this.genusRepository.searchByName(name);
  }

  public async validateGenusData(genusData: Partial<Genus>): Promise<string[]> {
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