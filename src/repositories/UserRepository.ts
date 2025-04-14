import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { ILike } from "typeorm";
import { IUser } from "../interfaces/IUser";


export class UserRepository {
  private repository: Repository<IUser>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }
  async findAll(): Promise<IUser[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<IUser | null> {
    return this.repository.findOne({
      where: { user_id: id },
      relations: ["role"]
    });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.repository.findOne({
      where: { email: email },
      relations: ["role"]
    });
  }

  async create(user: Partial<User>): Promise<IUser> {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<IUser | null> {
    await this.repository.update(id, user);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? true : false;
  }

  async searchByFullName(fullName: string): Promise<IUser[]> {
    return this.repository.find({
      where: { full_name: ILike(`%${fullName}%`) },
      relations: ["role"]
    });
  }

  async searchByEmail(email: string): Promise<IUser[]> {
    return this.repository.find({
      where: { email: ILike(`%${email}%`) },
      relations: ["role"]
    });
  }

  async searchBySpecialty(specialty: string): Promise<IUser[]> {
    return this.repository.find({
      where: { specialty: ILike(`%${specialty}%`) },
      relations: ["role"]
    });
  }
} 