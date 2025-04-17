import { Service } from 'typedi';
import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { ILike } from "typeorm";
import { IUser } from "../interfaces/IUser";
import { IUserDTO } from "../interfaces/IUser";

@Service()
export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  public async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['role']
    });
  }

  public async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { user_id: id },
      relations: ['role']
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role']
    });
  }

  public async create(userData: Partial<IUserDTO>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  public async update(id: number, userData: Partial<IUserDTO>): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;

    this.userRepository.merge(user, userData);
    return this.userRepository.save(user);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected !== 0;
  }

  public async searchByFullName(fullName: string): Promise<User[]> {
    return this.userRepository.find({
      where: { full_name: ILike(`%${fullName}%`) },
      relations: ["role"]
    });
  }

  public async searchByEmail(email: string): Promise<User[]> {
    return this.userRepository.find({
      where: { email: ILike(`%${email}%`) },
      relations: ["role"]
    });
  }

  public async searchBySpecialty(specialty: string): Promise<User[]> {
    return this.userRepository.find({
      where: { specialty: ILike(`%${specialty}%`) },
      relations: ["role"]
    });
  }
} 