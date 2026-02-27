import apiClient from './apiClient';
import { TokenStorage, UserStorage } from '@/utils/auth';
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  User, 
  ApiResponse 
} from '@/types/api';

class AuthService {
  private static instance: AuthService;
  
  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Login user with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse['data']>('/auth/login', credentials);
      
      if (response.success && response.data) {
        const { user, tokens } = response.data;
        TokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
        UserStorage.setUser(user);
        
        return {
          success: true,
          data: response.data,
        };
      }
      
      throw new Error(response.error?.message || 'Login failed');
    } catch (error: any) {
      throw {
        success: false,
        error: {
          message: error.error?.message || error.message || 'Login failed',
          code: error.error?.code || 'LOGIN_ERROR',
        },
      };
    }
  }

  /**
   * Register new user
   */
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse['data']>('/auth/register', userData);
      
      if (response.success && response.data) {
        const { user, tokens } = response.data;
        TokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
        UserStorage.setUser(user);
        
        return {
          success: true,
          data: response.data,
        };
      }
      
      throw new Error(response.error?.message || 'Registration failed');
    } catch (error: any) {
      throw {
        success: false,
        error: {
          message: error.error?.message || error.message || 'Registration failed',
          code: error.error?.code || 'REGISTER_ERROR',
        },
      };
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      const token = TokenStorage.getAccessToken();
      if (token) {
        await apiClient.post('/auth/logout');
      }
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error);
    } finally {
      this.clearLocalSession();
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<string | null> {
    const refreshToken = TokenStorage.getRefreshToken();
    if (!refreshToken) {
      this.clearLocalSession();
      return null;
    }

    try {
      const response = await apiClient.post<{ accessToken: string; refreshToken: string }>(
        '/auth/refresh',
        { refreshToken }
      );

      if (response.success && response.data) {
        TokenStorage.setTokens(response.data.accessToken, response.data.refreshToken);
        return response.data.accessToken;
      }
      
      throw new Error('Token refresh failed');
    } catch (error) {
      this.clearLocalSession();
      return null;
    }
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiClient.get<{ user: User }>('/auth/me');
      
      if (response.success && response.data?.user) {
        UserStorage.setUser(response.data.user);
        return response.data.user;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      return null;
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response = await apiClient.put<User>('/auth/profile', userData);
      
      if (response.success && response.data) {
        UserStorage.setUser(response.data);
      }
      
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Change password
   */
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<ApiResponse<void>> {
    try {
      return await apiClient.put('/auth/change-password', data);
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<ApiResponse<void>> {
    try {
      return await apiClient.post('/auth/forgot-password', { email });
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<void>> {
    try {
      return await apiClient.post('/auth/reset-password', { token, newPassword });
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<ApiResponse<void>> {
    try {
      return await apiClient.post('/auth/verify-email', { token });
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Resend email verification
   */
  async resendVerification(email: string): Promise<ApiResponse<void>> {
    try {
      return await apiClient.post('/auth/resend-verification', { email });
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = TokenStorage.getAccessToken();
    const user = UserStorage.getUser();
    
    return !!(token && user && !TokenStorage.isTokenExpired(token));
  }

  /**
   * Get current user from storage
   */
  getCurrentUserFromStorage(): User | null {
    return UserStorage.getUser();
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: string): boolean {
    const user = this.getCurrentUserFromStorage();
    return user?.role === role;
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUserFromStorage();
    return user ? roles.includes(user.role) : false;
  }

  /**
   * Clear local session data
   */
  private clearLocalSession(): void {
    TokenStorage.clearTokens();
    UserStorage.clearUser();
  }

  /**
   * Initialize authentication state from storage
   */
  initializeAuth(): {
    isAuthenticated: boolean;
    user: User | null;
  } {
    const token = TokenStorage.getAccessToken();
    const user = UserStorage.getUser();
    
    if (token && user && !TokenStorage.isTokenExpired(token)) {
      return {
        isAuthenticated: true,
        user,
      };
    }
    
    // Clear invalid data
    this.clearLocalSession();
    
    return {
      isAuthenticated: false,
      user: null,
    };
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return TokenStorage.getAccessToken();
  }

  /**
   * Check if token is expiring soon
   */
  isTokenExpiringSoon(): boolean {
    const token = TokenStorage.getAccessToken();
    return token ? TokenStorage.isTokenExpiringSoon(token) : true;
  }
}

// Export singleton instance
const authService = AuthService.getInstance();
export default authService;