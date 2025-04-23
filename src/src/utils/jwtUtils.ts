import jwt from 'jsonwebtoken';
import config from './config';

interface JWTPayload {
  userId: number;
  role?: string;
  email: string;
  purpose?: string;
}

export const jwtUtils = {
  generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.tokenExpiresIn,
    });
  },

  verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, config.jwtSecret) as JWTPayload;
    } catch (error) {
      return null;
    }
  },

  generateTokenForEmail(payload: JWTPayload): string {
    return jwt.sign(payload, config.jwtSecretEmail, { expiresIn: config.tokenExpiresIn });
  },

  verifyEmailToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, config.jwtSecretEmail) as JWTPayload;
    } catch (error) {
      return null;
    }
  }
};