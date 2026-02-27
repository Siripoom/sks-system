import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import authService from '@/services/authService';
import type { User, LoginCredentials, RegisterData } from '@/types/api';

interface AuthState {
  // State
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => void;
  
  // Helper functions
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  canAccessResource: (resourceRoles?: string[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,

        // Actions
        login: async (credentials: LoginCredentials) => {
          console.log('AuthStore: Login attempt with credentials:', { email: credentials.email });
          set({ isLoading: true, error: null });
          
          try {
            const response = await authService.login(credentials);
            console.log('AuthStore: Login response:', response);
            
            if (response.success && response.data) {
              console.log('AuthStore: Login successful, user:', response.data.user);
              console.log('AuthStore: Tokens received:', !!response.data.tokens);
              
              set({
                isAuthenticated: true,
                user: response.data.user,
                isLoading: false,
                error: null,
              });
              
              console.log('AuthStore: Auth state updated after login');
            } else {
              throw new Error('Login failed');
            }
          } catch (error: any) {
            console.error('AuthStore: Login error:', error);
            set({
              isAuthenticated: false,
              user: null,
              isLoading: false,
              error: error.error?.message || error.message || 'Login failed',
            });
            throw error;
          }
        },

        register: async (userData: RegisterData) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await authService.register(userData);
            
            if (response.success && response.data) {
              set({
                isAuthenticated: true,
                user: response.data.user,
                isLoading: false,
                error: null,
              });
            } else {
              throw new Error('Registration failed');
            }
          } catch (error: any) {
            set({
              isAuthenticated: false,
              user: null,
              isLoading: false,
              error: error.error?.message || error.message || 'Registration failed',
            });
            throw error;
          }
        },

        logout: async () => {
          set({ isLoading: true });
          
          try {
            await authService.logout();
          } catch (error) {
            console.error('Logout error:', error);
          } finally {
            set({
              isAuthenticated: false,
              user: null,
              isLoading: false,
              error: null,
            });
          }
        },

        refreshToken: async () => {
          try {
            const newToken = await authService.refreshToken();
            
            if (newToken) {
              // Token refreshed successfully, user stays authenticated
              const user = authService.getCurrentUserFromStorage();
              set({
                isAuthenticated: true,
                user,
              });
            } else {
              // Refresh failed, logout user
              set({
                isAuthenticated: false,
                user: null,
                error: 'Session expired',
              });
            }
          } catch (error: any) {
            set({
              isAuthenticated: false,
              user: null,
              error: error.message || 'Session expired',
            });
          }
        },

        getCurrentUser: async () => {
          set({ isLoading: true, error: null });
          
          try {
            const user = await authService.getCurrentUser();
            
            if (user) {
              set({
                user,
                isAuthenticated: true,
                isLoading: false,
              });
            } else {
              set({
                isAuthenticated: false,
                user: null,
                isLoading: false,
                error: 'Failed to fetch user data',
              });
            }
          } catch (error: any) {
            set({
              isAuthenticated: false,
              user: null,
              isLoading: false,
              error: error.message || 'Failed to fetch user data',
            });
          }
        },

        updateProfile: async (userData: Partial<User>) => {
          const { user } = get();
          if (!user) throw new Error('User not authenticated');
          
          set({ isLoading: true, error: null });
          
          try {
            const response = await authService.updateProfile(userData);
            
            if (response.success && response.data) {
              set({
                user: response.data,
                isLoading: false,
              });
            } else {
              throw new Error('Profile update failed');
            }
          } catch (error: any) {
            set({
              isLoading: false,
              error: error.error?.message || error.message || 'Profile update failed',
            });
            throw error;
          }
        },

        clearError: () => {
          set({ error: null });
        },

        setLoading: (loading: boolean) => {
          set({ isLoading: loading });
        },

        initializeAuth: () => {
          console.log('AuthStore: Initializing auth...');
          const authData = authService.initializeAuth();
          console.log('AuthStore: Auth data:', authData);
          console.log('AuthStore: Token available:', !!authService.getAccessToken());
          console.log('AuthStore: User from storage:', authData.user);
          
          set({
            isAuthenticated: authData.isAuthenticated,
            user: authData.user,
            isLoading: false,
          });
          
          console.log('AuthStore: Auth initialized, isAuthenticated:', authData.isAuthenticated);
        },

        // Helper functions
        hasRole: (role: string) => {
          const { user } = get();
          return user?.role === role;
        },

        hasAnyRole: (roles: string[]) => {
          const { user } = get();
          return user ? roles.includes(user.role) : false;
        },

        canAccessResource: (resourceRoles?: string[]) => {
          const { user, hasAnyRole } = get();
          if (!user) return false;
          if (!resourceRoles || resourceRoles.length === 0) return true;
          return hasAnyRole(resourceRoles);
        },
      }),
      {
        name: 'auth-store',
        partialize: (state) => ({
          // Only persist user data and authentication status
          // Tokens are handled by authService
          isAuthenticated: state.isAuthenticated,
          user: state.user,
        }),
      }
    ),
    {
      name: 'auth-store',
    }
  )
);