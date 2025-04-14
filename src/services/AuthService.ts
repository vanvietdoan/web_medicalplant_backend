import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcryptjs";
import { sendVerificationEmail, sendNewPasswordEmail } from "../utils/email";
import { IUser, IRegisterDTO } from "../interfaces/IUser";
import { jwtUtils } from "../utils/jwtUtils";
import config from "../utils/config";
import { tokenBlacklist } from "../utils/tokenBlacklist";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(email: string, password: string): Promise<{ user: IUser; token: string } | null> {
    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;
  
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return null;
  
    // Check if account is active
    if (!user.active) {
      throw new Error("Account is not active");
    }

    // Generate JWT token
    const token = jwtUtils.generateToken({
      userId: user.user_id,
      role: user.role?.name,
      email: user.email
    });
  
    return { user, token };
  }

  async logout(token: string): Promise<boolean> {
    try {
      // Verify the token is valid before blacklisting
      const decoded = jwtUtils.verifyToken(token);
      if (!decoded) {
        return false;
      }

      // Add token to blacklist
      tokenBlacklist.addToBlacklist(token);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  async register(userData: Partial<IRegisterDTO>): Promise<IRegisterDTO> {
    // Check if user already exists
    const existingEmail = await this.userRepository.findByEmail(userData.email || "");
    if (existingEmail) {
      throw new Error("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password || "", 10);
    
    // Create user with inactive status
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
      active: false
    });
  
    const payload = {
      userId: user.user_id,
      role: user.role?.name,
      email: user.email
    };
    
    // Generate verification token using JWT
    const verificationToken = jwtUtils.generateTokenForEmail(payload); // 24 hours expiry

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);
  
    return user;
  }

  async verifyEmail(token: string): Promise<boolean> {
    try {
      // Verify and decode the JWT token
      const decoded = jwtUtils.verifyEmailToken(token);

      console.log(decoded);
      
      if (!decoded) {
        return false;
      }
      
      // Activate user account
      await this.userRepository.update(decoded.userId, { active: true });
      
      return true;
    } catch (error) {
      return false;
    }
  }

  async forgotPassword(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return false;
    
    // Generate a random password
    const newPassword = this.generateRandomPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update user with new password
    await this.userRepository.update(user.user_id, { password: hashedPassword });
    
    // Send email with the new password
    await sendNewPasswordEmail(user.email, newPassword);
    
    return true;
  }

  async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    if (!user) return false;

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) return false;

    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userRepository.update(userId, { password: hashedPassword });
      return true;
    } catch (error) {
      console.error('Error in changePassword:', error);
      return false;
    }
  }
  
  private generateRandomPassword(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    
    return password;
  }
}