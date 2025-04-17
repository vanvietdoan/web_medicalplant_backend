import { Service } from 'typedi';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { IUser, IUserDTO, IUserResponse } from "../interfaces/IUser";
import bcrypt from "bcryptjs";
import { Role } from '../entities/Role';

@Service()
export class UserService {
  constructor(
    private userRepository: UserRepository
  ) {}

  public async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  public async create(userData: Partial<User>): Promise<User> {
    return this.userRepository.create(userData);
  }

  public async update(id: number, userData: Partial<User>): Promise<User | null> {
    return this.userRepository.update(id, userData);
  }

  public async delete(id: number): Promise<boolean> {
    return this.userRepository.delete(id);
  }

  public async getAllUsers(): Promise<IUserResponse[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => ({
      user_id: user.user_id,
      email: user.email,
      full_name: user.full_name,
      title: user.title,
      proof: user.proof,
      specialty: user.specialty,
      active: user.active,
      avatar: user.avatar,
      role_id: user.role_id,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }));
  }

  public async getUserById(id: number): Promise<IUserResponse | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;
    
    return {
      user_id: user.user_id,
      email: user.email,
      full_name: user.full_name,
      title: user.title,
      proof: user.proof,
      specialty: user.specialty,
      active: user.active,
      avatar: user.avatar,
      role_id: user.role_id,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  public async createUser(userData: Partial<IUserDTO>): Promise<IUserResponse> {
    // Check if user with this email already exists
    if (userData.email) {
      const existingUser = await this.userRepository.findByEmail(userData.email);
      if (existingUser) {
        throw new Error("User with this email already exists");
      }
    }

    // Hash password if provided
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const user = await this.userRepository.create(userData);
    return {
      user_id: user.user_id,
      email: user.email,
      full_name: user.full_name,
      title: user.title,
      proof: user.proof,
      specialty: user.specialty,
      active: user.active,
      avatar: user.avatar,
      role_id: user.role_id,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  public async updateUser(id: number, userData: Partial<IUserDTO>): Promise<IUserResponse | null> {
    // Hash password if it's being updated
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const user = await this.userRepository.update(id, userData);
    if (!user) return null;

    return {
      user_id: user.user_id,
      email: user.email,
      full_name: user.full_name,
      title: user.title,
      proof: user.proof,
      specialty: user.specialty,
      active: user.active,
      avatar: user.avatar,
      role_id: user.role_id,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  public async deleteUser(id: number): Promise<boolean> {
    return this.userRepository.delete(id);
  }

  public async getUserByEmail(email: string): Promise<IUserResponse | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    return {
      user_id: user.user_id,
      email: user.email,
      full_name: user.full_name,
      title: user.title,
      proof: user.proof,
      specialty: user.specialty,
      active: user.active,
      avatar: user.avatar,
      role_id: user.role_id,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}