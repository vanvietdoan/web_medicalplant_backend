import { Service } from "typedi";
import { DiseaseRepository } from "../repositories/DiseaseRepository";
import { AdviceCommentRepository } from "../repositories/AdviceCommentRepository";
import { PictureRepository } from "../repositories/PictureRepository";
import { Disease } from "../entities/Disease";
import { AdviceComment } from "../entities/AdviceComment";
import { Picture } from "../entities/Picture";
import { IDisease } from "../interfaces/IDisease";
import logger from "../utils/logger";

@Service()
export class DiseaseService {
  private host: string = '';

  constructor(
    private diseaseRepository: DiseaseRepository,
    private adviceCommentRepository: AdviceCommentRepository,
    private pictureRepository: PictureRepository
  ) {}

  public setHost(host: string) {
    logger.info(`Setting host in DiseaseService: ${host}`);
    this.host = host;
  }

  private formatUrl(path: string | undefined | null): string | null {
    if (!path) return null;
    if (!this.host) {
      logger.warn('Host is not set in DiseaseService');
      return path;
    }
    const formattedUrl = `${this.host}/${path}`;
    logger.debug(`Formatted URL: ${formattedUrl}`);
    return formattedUrl;
  }

  private mapDiseaseResponse(disease: any, pictures: Picture[]) {
    const mappedDisease = {
      created_at: disease.created_at,
      updated_at: disease.updated_at,
      disease_id: disease.disease_id,
      name: disease.name,
      description: disease.description,
      symptoms: disease.symptoms,
      instructions: disease.instructions,
      images: pictures
        .filter((picture: Picture) => picture.disease_id === disease.disease_id)
        .map((picture: Picture) => ({
          picture_id: picture.picture_id,
          url: this.formatUrl(picture.url)
        }))
    };
    return mappedDisease as IDisease;
  }

  public async getAllDiseases(): Promise<IDisease[]> {
    logger.info('Service getAllDiseases');
    if (!this.host) {
      logger.warn('Host is not set when calling getAllDiseases');
    }
    const diseases = await this.diseaseRepository.findAll();
    const pictures = await this.pictureRepository.findAll();
    
    return diseases.map(disease => this.mapDiseaseResponse(disease, pictures));
  }

  public async getDiseaseById(id: number): Promise<IDisease | null> {
    logger.info(`Service getDiseaseById ${id}`);
    if (!this.host) {
      logger.warn('Host is not set when calling getDiseaseById');
    }
    const disease = await this.diseaseRepository.findById(id);
    const pictures = await this.pictureRepository.findAll();
    if (!disease) {
      return null;
    }
    return this.mapDiseaseResponse(disease, pictures);
  }

  public async createDisease(diseaseData: Partial<IDisease> & { images?: Array<{ url: string }> }): Promise<IDisease> {
    if (!this.host) {
      logger.warn('Host is not set when calling createDisease');
    }
    const { images, ...diseaseInfo } = diseaseData;
    const newDisease = await this.diseaseRepository.create(diseaseInfo);
    
    if (images && images.length > 0) {
      await Promise.all(images.map(image => 
        this.pictureRepository.create({
          url: image.url,
          disease_id: newDisease.disease_id
        })
      ));
    }
    
    return this.getDiseaseById(newDisease.disease_id) as Promise<IDisease>;
  }

  public async updateDisease(id: number, diseaseData: Partial<IDisease> & { images?: Array<{ url: string }> }): Promise<IDisease | null> {
    if (!this.host) {
      logger.warn('Host is not set when calling updateDisease');
    }
    const { images, ...diseaseInfo } = diseaseData;
    await this.diseaseRepository.update(id, diseaseInfo);
    
    if (images) {
      // Delete existing pictures for this disease
      const existingPictures = await this.pictureRepository.findByDisease(id);
      await Promise.all(existingPictures.map(picture => 
        this.pictureRepository.delete(picture.picture_id)
      ));
      
      // Create new pictures
      await Promise.all(images.map(image => 
        this.pictureRepository.create({
          url: image.url,
          disease_id: id
        })
      ));
    }
    
    return this.getDiseaseById(id);
  }

  public async deleteDisease(id: number): Promise<boolean> {
    return this.diseaseRepository.delete(id);
  }

  public async searchByName(name: string): Promise<IDisease[]> {
    if (!this.host) {
      logger.warn('Host is not set when calling searchByName');
    }
    const diseases = await this.diseaseRepository.searchByName(name);
    const pictures = await this.pictureRepository.findAll();
    return diseases.map(disease => this.mapDiseaseResponse(disease, pictures));
  }

  public async searchBySymptoms(symptoms: string): Promise<IDisease[]> {
    if (!this.host) {
      logger.warn('Host is not set when calling searchBySymptoms');
    }
    const diseases = await this.diseaseRepository.searchBySymptoms(symptoms);
    const pictures = await this.pictureRepository.findAll();
    return diseases.map(disease => this.mapDiseaseResponse(disease, pictures));
  }

  public async getDiseaseWithAdvice(id: number): Promise<{ disease: Disease | null; advice: AdviceComment[] }> {
    if (!this.host) {
      logger.warn('Host is not set when calling getDiseaseWithAdvice');
    }
    const disease = await this.diseaseRepository.findById(id);
    const advice = disease ? await this.adviceCommentRepository.findByDisease(id) : [];
    
    return { disease, advice };
  }

  public async addAdviceToDisease(diseaseId: number, adviceData: Partial<AdviceComment>): Promise<AdviceComment> {
    const disease = await this.diseaseRepository.findById(diseaseId);
    if (!disease) {
      throw new Error('Disease not found');
    }
    
    return this.adviceCommentRepository.create({
      ...adviceData,
      disease
    });
  }
}