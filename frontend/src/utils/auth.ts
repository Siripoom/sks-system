import { AUTH_CONFIG } from '@/constants/app';

/**
 * Secure token storage utilities
 */
export class TokenStorage {
  static setTokens(accessToken: string, refreshToken: string): void {
    try {
      localStorage.setItem(AUTH_CONFIG.ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(AUTH_CONFIG.REFRESH_TOKEN_KEY, refreshToken);
      this.scheduleTokenRefresh(accessToken);
    } catch (error) {
      console.error('Failed to store tokens:', error);
    }
  }

  static getAccessToken(): string | null {
    try {
      return localStorage.getItem(AUTH_CONFIG.ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null;
    }
  }

  static getRefreshToken(): string | null {
    try {
      return localStorage.getItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get refresh token:', error);
      return null;
    }
  }

  static clearTokens(): void {
    try {
      localStorage.removeItem(AUTH_CONFIG.ACCESS_TOKEN_KEY);
      localStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
      localStorage.removeItem(AUTH_CONFIG.USER_DATA_KEY);
    } catch (error) {
      console.error('Failed to clear tokens:', error);
    }
  }

  static isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  static isTokenExpiringSoon(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now();
      const expirationTime = payload.exp * 1000;
      return (expirationTime - currentTime) < AUTH_CONFIG.TOKEN_REFRESH_THRESHOLD;
    } catch (error) {
      return true;
    }
  }

  private static scheduleTokenRefresh(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiry = expirationTime - currentTime;
      
      // Refresh 5 minutes before expiry
      const refreshTime = Math.max(0, timeUntilExpiry - AUTH_CONFIG.TOKEN_REFRESH_THRESHOLD);
      
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('tokenRefreshNeeded'));
      }, refreshTime);
    } catch (error) {
      console.error('Failed to schedule token refresh:', error);
    }
  }
}

/**
 * User data storage utilities
 */
export class UserStorage {
  static setUser(user: any): void {
    try {
      localStorage.setItem(AUTH_CONFIG.USER_DATA_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to store user data:', error);
    }
  }

  static getUser(): any {
    try {
      const userData = localStorage.getItem(AUTH_CONFIG.USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to get user data:', error);
      return null;
    }
  }

  static clearUser(): void {
    try {
      localStorage.removeItem(AUTH_CONFIG.USER_DATA_KEY);
    } catch (error) {
      console.error('Failed to clear user data:', error);
    }
  }
}

/**
 * Permission checking utilities
 */
export class PermissionChecker {
  static hasRole(userRole: string, allowedRoles: string[]): boolean {
    if (!allowedRoles || allowedRoles.length === 0) return true;
    return allowedRoles.includes(userRole);
  }

  static hasAnyRole(userRole: string, roles: string[]): boolean {
    return this.hasRole(userRole, roles);
  }

  static hasAllRoles(userRole: string, roles: string[]): boolean {
    // For single user role system, user either has the role or doesn't
    return roles.every(role => userRole === role);
  }

  static canAccessResource(userRole: string, resourceRoles?: string[]): boolean {
    if (!resourceRoles || resourceRoles.length === 0) return true;
    return this.hasAnyRole(userRole, resourceRoles);
  }
}