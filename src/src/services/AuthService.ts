import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcryptjs";
import { sendVerificationEmail, sendNewPasswordEmail } from "../utils/email";
import { IUser, IRegisterDTO } from "../interfaces/IUser";
import { jwtUtils } from "../utils/jwtUtils";
import config from "../utils/config";
import { Service } from "typedi";
import { TokenCache } from "../utils/tokenCache";

@Service()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private tokenCache: TokenCache
  ) {}

  public async login(email: string, password: string): Promise<{ user: IUser; token: string } | null> {
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
    
    // Store token in cache for this user
    this.tokenCache.setToken(user.user_id, token);
  
    return { user, token };
  }

  public async logout(userId: number): Promise<boolean> {
    try {
      // Remove token from cache
      this.tokenCache.removeToken(userId);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  public async register(userData: Partial<IRegisterDTO>): Promise<IRegisterDTO> {
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

    this.tokenCache.setToken(user.user_id, verificationToken);

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);
  
    return user;
  }

  public async verifyEmail(token: string): Promise<boolean> {
    try {
      // Verify and decode the JWT token
      const decoded = jwtUtils.verifyEmailToken(token);
      
      if (!decoded) {
        return false;
      }

      // Remove token from cache
      this.tokenCache.removeToken(decoded.userId);
      
      // Activate user account
      await this.userRepository.update(decoded.userId, { active: true });
      
      return true;
    } catch (error) {
      return false;
    }
  }

  public async forgotPassword(email: string): Promise<boolean> {
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

  public async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<boolean> {
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