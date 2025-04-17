import NodeCache from 'node-cache';
import { Service } from 'typedi';

@Service()
export class TokenCache {
  private cache: NodeCache;
  
  constructor() {
    // stdTTL: thời gian sống mặc định của token (3600 giây = 1 giờ)
    // checkperiod: khoảng thời gian kiểm tra và xóa token hết hạn (600 giây = 10 phút)
    this.cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });
  }

  /**
   * Lưu token với userId làm key
   * @param userId ID của user
   * @param token JWT token
   * @param ttl Thời gian sống của token (giây)
   */
  public setToken(userId: number, token: string, ttl: number = 3600): boolean {
    return this.cache.set(`token_${userId}`, token, ttl);
  }

  /**
   * Lấy token dựa vào userId
   * @param userId ID của user
   */
  public getToken(userId: number): string | undefined {
    return this.cache.get(`token_${userId}`);
  }

  /**
   * Xác thực token
   * @param userId ID của user
   * @param token JWT token cần xác thực
   */
  public validateToken(userId: number, token: string): boolean {
    const storedToken = this.getToken(userId);
    return storedToken !== undefined && storedToken === token;
  }

  /**
   * Xóa token khi đăng xuất
   * @param userId ID của user
   */
  public removeToken(userId: number): void {
    this.cache.del(`token_${userId}`);
  }

  /**
   * Kiểm tra xem token có tồn tại không
   * @param userId ID của user
   */
  public hasToken(userId: number): boolean {
    return this.cache.has(`token_${userId}`);
  }
} 