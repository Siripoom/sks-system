import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG, ERROR_MESSAGES } from '@/constants/app';
import { TokenStorage } from '@/utils/auth';
import type { ApiResponse, PaginatedResponse } from '@/types/api';

class ApiClient {
  private instance: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor() {
    console.log('ApiClient: Initializing with BASE_URL:', API_CONFIG.BASE_URL);
    
    this.instance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
    this.setupTokenRefreshListener();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.instance.interceptors.request.use(
      (config) => {
        console.log('ApiClient: Making request to:', config.url);
        const token = TokenStorage.getAccessToken();
        console.log('ApiClient: Token available:', !!token);
        
        if (token) {
          console.log('ApiClient: Token expired?', TokenStorage.isTokenExpired(token));
          if (!TokenStorage.isTokenExpired(token)) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('ApiClient: Added Authorization header');
          } else {
            console.log('ApiClient: Token expired, not adding to request');
          }
        } else {
          console.log('ApiClient: No token available');
        }
        
        console.log('ApiClient: Request config:', {
          url: config.url,
          method: config.method,
          hasAuth: !!config.headers.Authorization,
          params: config.params
        });
        
        return config;
      },
      (error) => {
        console.error('ApiClient: Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token refresh and errors
    this.instance.interceptors.response.use(
      (response) => {
        console.log('ApiClient: Response received:', response.status, response.config.url);
        return response;
      },
      async (error: AxiosError) => {
        console.error('ApiClient: Response error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          url: error.config?.url,
          code: error.code,
          message: error.message
        });
        
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        
        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const newToken = await this.handleTokenRefresh();
            if (newToken && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.instance(originalRequest);
            }
          } catch (refreshError) {
            this.handleAuthFailure();
            return Promise.reject(refreshError);
          }
        }
        
        // Handle other errors
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private async handleTokenRefresh(): Promise<string | null> {
    const refreshToken = TokenStorage.getRefreshToken();
    
    if (!refreshToken) {
      this.handleAuthFailure();
      return null;
    }

    if (this.isRefreshing) {
      // If already refreshing, wait for the refresh to complete
      return new Promise((resolve) => {
        this.refreshSubscribers.push(resolve);
      });
    }

    this.isRefreshing = true;

    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      if (response.data.success) {
        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        TokenStorage.setTokens(accessToken, newRefreshToken);
        
        // Notify all waiting requests
        this.refreshSubscribers.forEach((callback) => callback(accessToken));
        this.refreshSubscribers = [];
        
        return accessToken;
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      this.handleAuthFailure();
      return null;
    } finally {
      this.isRefreshing = false;
    }
  }

  private setupTokenRefreshListener() {
    if (typeof window !== 'undefined') {
      window.addEventListener('tokenRefreshNeeded', () => {
        this.handleTokenRefresh();
      });
    }
  }

  private handleAuthFailure() {
    TokenStorage.clearTokens();
    
    // Only redirect if not already on login page
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth')) {
      window.location.href = '/auth/login';
    }
  }

  private handleError(error: AxiosError): ApiResponse {
    if (error.response?.data) {
      return error.response.data as ApiResponse;
    }

    // Handle different types of errors
    if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        error: {
          message: 'Request timeout. Please try again.',
          code: 'TIMEOUT',
        },
      };
    }

    if (error.code === 'ERR_NETWORK') {
      return {
        success: false,
        error: {
          message: ERROR_MESSAGES.NETWORK_ERROR,
          code: 'NETWORK_ERROR',
        },
      };
    }

    return {
      success: false,
      error: {
        message: ERROR_MESSAGES.SERVER_ERROR,
        code: 'UNKNOWN_ERROR',
      },
    };
  }

  // Generic API methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.instance.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.instance.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.instance.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.instance.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.instance.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Pagination helper
  async getPaginated<T>(
    url: string,
    page: number = 1,
    limit: number = 10,
    filters?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<PaginatedResponse<T>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...Object.entries(filters || {}).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, string>),
    });

    try {
      const response: AxiosResponse<PaginatedResponse<T>> = await this.instance.get(
        `${url}?${params}`,
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // File upload helper
  async uploadFile<T>(
    url: string,
    file: File,
    field: string = 'file',
    additionalData?: Record<string, any>,
    onUploadProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append(field, file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
    }

    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.instance.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onUploadProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onUploadProgress(progress);
          }
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Retry mechanism for failed requests
  async retryRequest<T>(
    request: () => Promise<ApiResponse<T>>,
    maxRetries: number = API_CONFIG.RETRY_ATTEMPTS,
    delay: number = API_CONFIG.RETRY_DELAY
  ): Promise<ApiResponse<T>> {
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await request();
      } catch (error) {
        lastError = error;
        
        if (attempt === maxRetries) {
          throw lastError;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }

    throw lastError;
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.instance.get('/health');
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get the raw axios instance for special cases
  getInstance(): AxiosInstance {
    return this.instance;
  }
}

// Export singleton instance
const apiClient = new ApiClient();
export default apiClient;