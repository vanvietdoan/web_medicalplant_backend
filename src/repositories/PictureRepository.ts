import { Repository } from "typeorm";
import { Picture } from "../entities/Picture";
import { AppDataSource } from "../config/database";
import { ILike } from "typeorm";

export class PictureRepository {
  private repository: Repository<Picture>;

  constructor() {
    this.repository = AppDataSource.getRepository(Picture);
  }

  async findAll(): Promise<Picture[]> {
    return this.repository.find({
      relations: ["plant", "disease"]
    });
  }

  async findById(id: number): Promise<Picture | null> {
    return this.repository.findOne({
      where: { picture_id: id },
      relations: ["plant", "disease"]
    });
  }

  async create(picture: Partial<Picture>): Promise<Picture> {
    const newPicture = this.repository.create(picture);
    return this.repository.save(newPicture);
  }

  async update(id: number, picture: Partial<Picture>): Promise<Picture | null> {
    await this.repository.update(id, picture);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  async findByPlant(plantId: number): Promise<Picture[]> {
    return this.repository.find({
      where: { plant_id: plantId },
      relations: ["plant"]
    });
  }

  async findByDisease(diseaseId: number): Promise<Picture[]> {
    return this.repository.find({
      where: { disease_id: diseaseId },
      relations: ["disease"]
    });
  }

  async searchByDescription(description: string): Promise<Picture[]> {
    return this.repository.find({
      where: {
        description: ILike(`%${description}%`)
      },
      relations: ["plant", "disease"]
    });
  }
} 