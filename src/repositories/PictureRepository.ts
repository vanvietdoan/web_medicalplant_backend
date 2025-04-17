import { Repository } from "typeorm";
import { Service } from "typedi";
import { Picture } from "../entities/Picture";
import { AppDataSource } from "../config/database";
import { ILike } from "typeorm";

@Service()
export class PictureRepository {
  private repository: Repository<Picture>;

  constructor() {
    this.repository = AppDataSource.getRepository(Picture);
  }

  public async findAll(): Promise<Picture[]> {
    return this.repository.find({
      relations: ["plant", "disease"]
    });
  }

  public async findById(id: number): Promise<Picture | null> {
    return this.repository.findOne({
      where: { picture_id: id },
      relations: ["plant", "disease"]
    });
  }

  public async create(picture: Partial<Picture>): Promise<Picture> {
    const newPicture = this.repository.create(picture);
    return this.repository.save(newPicture);
  }

  public async update(id: number, picture: Partial<Picture>): Promise<Picture | null> {
    await this.repository.update(id, picture);
    return this.findById(id);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  public async findByPlant(plantId: number): Promise<Picture[]> {
    return this.repository.find({
      where: { plant_id: plantId },
      relations: ["plant"]
    });
  }

  public async findByDisease(diseaseId: number): Promise<Picture[]> {
    return this.repository.find({
      where: { disease_id: diseaseId },
      relations: ["disease"]
    });
  }

  public async searchByDescription(description: string): Promise<Picture[]> {
    return this.repository.find({
      where: {
        description: ILike(`%${description}%`)
      },
      relations: ["plant", "disease"]
    });
  }
} 