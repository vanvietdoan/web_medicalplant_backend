import { Request, Response, NextFunction } from "express";
import { jwtUtils } from "../utils/jwtUtils";
import { tokenBlacklist } from "../utils/tokenBlacklist";

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

    // Check if token is blacklisted to check logout(time)
    if (tokenBlacklist.isBlacklisted(token)) {
      throw new Error("Token has been invalidated");
    }

    const decoded = jwtUtils.verifyToken(token);
    if (!decoded) {
      throw new Error("Invalid or expired token");
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