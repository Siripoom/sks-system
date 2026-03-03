import apiClient from './apiClient';
import type {
  User,
  CreateUserData,
  UpdateUserData,
  PaginationParams,
  PaginatedResponse,
} from '@/types/api';

export class UserService {
  private static readonly BASE_PATH = '/users';

  static async getUsers(
    params?: PaginationParams & { role?: string }
  ): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get<{
      items: User[];
      pagination: { page: number; limit: number; total: number; pages: number };
    }>(this.BASE_PATH, { params });

    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to fetch users');
    }

    if (!response.data) {
      throw new Error('No data received from users API');
    }
    console.log('Fetched users:', response.data);
    return {
      success: true,
      data: response.data,
    } as PaginatedResponse<User>;
  }

  static async getUser(id: string): Promise<User> {
    const response = await apiClient.get<User>(`${this.BASE_PATH}/${id}`);
    return response.data as User;
  }

  static async createUser(data: CreateUserData): Promise<User> {
    const response = await apiClient.post<User>(this.BASE_PATH, data);
    return response.data as User;
  }

  static async updateUser(id: string, data: UpdateUserData): Promise<User> {
    const response = await apiClient.put<User>(`${this.BASE_PATH}/${id}`, data);
    return response.data as User;
  }

  static async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/${id}`);
  }

  static async searchUsers(
    query: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get<{
      items: User[];
      pagination: { page: number; limit: number; total: number; pages: number };
    }>(`${this.BASE_PATH}/search`, {
      params: { q: query, ...params },
    });

    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to search users');
    }

    if (!response.data) {
      throw new Error('No data received from user search API');
    }

    return {
      success: true,
      data: response.data,
    } as PaginatedResponse<User>;
  }

  static async getUserProfile(): Promise<User> {
    const response = await apiClient.get<User>('/auth/profile');
    return response.data as User;
  }

  static async updateUserProfile(data: UpdateUserData): Promise<User> {
    const response = await apiClient.put<User>('/auth/profile', data);
    return response.data as User;
  }

  static async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    await apiClient.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  }

  static async updateUserRole(id: string, role: string): Promise<User> {
    const response = await apiClient.patch<User>(
      `${this.BASE_PATH}/${id}/role`,
      { role }
    );
    return response.data as User;
  }

  static async bulkUpdateUsers(
    userIds: string[],
    updates: Partial<UpdateUserData>
  ): Promise<void> {
    await apiClient.post(`${this.BASE_PATH}/bulk-update`, {
      userIds,
      updates,
    });
  }

  static async getUserStats(id: string) {
    const response = await apiClient.get<any>(`${this.BASE_PATH}/${id}/stats`);
    return response.data;
  }
}
