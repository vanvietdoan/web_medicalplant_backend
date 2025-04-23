import { Request, Response, NextFunction } from "express";
import { jwtUtils } from "../utils/jwtUtils";
import { TokenCache } from "../utils/tokenCache";
import { Container } from "typedi";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role?: string;
    email: string;
  };
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      throw new Error("No authentication token provided");
    }

    // Verify and decode the token
    const decoded = jwtUtils.verifyToken(token);
    if (!decoded) {
      throw new Error("Invalid or expired token");
    }
    
    // Get the TokenCache instance from container
    const tokenCache = Container.get(TokenCache);
    
    // Check if token is valid in cache
    if (!tokenCache.validateToken(decoded.userId, token)) {
      throw new Error("Token is invalid or revoked");
    }
    
    req.user = {
      id: decoded.userId,
      role: decoded.role,
      email: decoded.email
    };
    
    next();
  } catch (error) {
    res.status(401).json({ message: "Please authenticate" });
  }
};