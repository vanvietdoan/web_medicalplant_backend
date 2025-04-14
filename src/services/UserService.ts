import { UserRepository } from "../repositories/UserRepository";
import { IUser, IUserDTO, IUserResponse } from "../interfaces/IUser";
import bcrypt from "bcryptjs";
import { Role } from '../entities/Role';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<IUserResponse[]> {
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

  async getUserById(id: number): Promise<IUserResponse | null> {
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

  async createUser(userData: Partial<IUserDTO>): Promise<IUserResponse> {
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

  async updateUser(id: number, userData: Partial<IUserDTO>): Promise<IUserResponse | null> {
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

  async deleteUser(id: number): Promise<boolean> {
    return this.userRepository.delete(id);
  }

  async getUserByEmail(email: string): Promise<IUserResponse | null> {
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