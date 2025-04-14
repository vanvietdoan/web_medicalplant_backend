class TokenBlacklist {
  private blacklistedTokens: Set<string> = new Set();

  addToBlacklist(token: string): void {
    this.blacklistedTokens.add(token);
  }

  isBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }

  // Clean up expired tokens periodically
  cleanupBlacklist(): void {
    // Implementation for cleanup if needed
  }
}

export const tokenBlacklist = new TokenBlacklist();