import { Service } from "typedi";
import { DiseaseRepository } from "../repositories/DiseaseRepository";
import { AdviceCommentRepository } from "../repositories/AdviceCommentRepository";
import { PictureRepository } from "../repositories/PictureRepository";
import { Disease } from "../entities/Disease";
import { AdviceComment } from "../entities/AdviceComment";
import { Picture } from "../entities/Picture";
import { IDisease } from "../interfaces/IDisease";

@Service()
export class DiseaseService {
  constructor(
    private diseaseRepository: DiseaseRepository,
    private adviceCommentRepository: AdviceCommentRepository,
    private pictureRepository: PictureRepository
  ) {}

  public async getAllDiseases(): Promise<any[]> {
    console.log('Service getAllDiseases');
    const diseases = await this.diseaseRepository.findAll();
    const pictures = await this.pictureRepository.findAll();
    
    return diseases.map(disease => ({
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
          url: picture.url
        }))
    }));
  }

  public async getDiseaseById(id: number): Promise<IDisease | null> {
    console.log('Service getDiseaseById', id);
    const disease = await this.diseaseRepository.findById(id);
    const pictures = await this.pictureRepository.findAll();
    if (!disease) {
      return null;
    }
    return {
      ...disease,
      images: pictures
        .filter((picture: Picture) => picture.disease_id === id)
        .map((picture: Picture) => ({
          picture_id: picture.picture_id,
          url: picture.url
        }))
    };
  }

  public async createDisease(diseaseData: Partial<IDisease> & { images?: Array<{ url: string }> }): Promise<IDisease> {
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
    return this.diseaseRepository.searchByName(name);
  }

  public async searchBySymptoms(symptoms: string): Promise<IDisease[]> {
    return this.diseaseRepository.searchBySymptoms(symptoms);
  }

  public async getDiseaseWithAdvice(id: number): Promise<{ disease: Disease | null; advice: AdviceComment[] }> {
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