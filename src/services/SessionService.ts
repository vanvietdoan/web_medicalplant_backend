import { sessionStore } from "../utils/sessionStore";

export class SessionService {
  // Validate session by token
  validateSession(token: string): { userId: number; role?: string } | null {
    const session = sessionStore.getSessionByToken(token);
    if (!session) return null;
    
    return { userId: session.userId, role: session.role };
  }
  
  // Logout by token
  logout(token: string): boolean {
    return sessionStore.deleteSessionByToken(token);
  }
  
  // Create a new session
  createSession(userId: number, expiresIn: number, role?: string): { token: string } {
    const { token } = sessionStore.createSession(userId, expiresIn, role);
    return { token };
  }
  
  // Get all active sessions for a user
  getUserSessions(userId: number): string[] {
    return sessionStore.getUserSessions(userId);
  }
  
  // Invalidate all sessions for a user
  invalidateUserSessions(userId: number): boolean {
    return sessionStore.deleteUserSessions(userId);
  }
}