'use client';

import apiClient from './apiClient';

export interface Notification {
  id: string;
  userId: string;
  type: 'TRIP_UPDATE' | 'DELAY_ALERT' | 'ARRIVAL_NOTIFICATION' | 'EMERGENCY_ALERT' | 'SYSTEM_ANNOUNCEMENT' | 'MAINTENANCE_UPDATE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  title: string;
  message: string;
  data?: Record<string, any>;
  channels: ('EMAIL' | 'SMS' | 'PUSH' | 'IN_APP')[];
  status: 'PENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';
  scheduledAt?: string;
  sentAt?: string;
  readAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: string;
  title: string;
  message: string;
  channels: string[];
  variables: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface NotificationSubscription {
  id: string;
  userId: string;
  type: string;
  channels: string[];
  preferences: {
    enabled: boolean;
    quietHours?: {
      start: string;
      end: string;
    };
    frequency?: 'IMMEDIATE' | 'HOURLY' | 'DAILY';
  };
  createdAt: string;
  updatedAt?: string;
}

export interface NotificationStats {
  totalSent: number;
  deliveryRate: number;
  readRate: number;
  byChannel: Record<string, {
    sent: number;
    delivered: number;
    failed: number;
  }>;
  byType: Record<string, {
    sent: number;
    read: number;
  }>;
  recentActivity: Array<{
    timestamp: string;
    type: string;
    count: number;
  }>;
}

export class NotificationService {
  private static readonly BASE_PATH = '/notifications';

  // Notification Management
  static async getUserNotifications(
    userId?: string,
    filters?: {
      type?: string;
      status?: string;
      priority?: string;
      startDate?: string;
      endDate?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<{ data: { items: Notification[], pagination: any } }> {
    const params = new URLSearchParams();
    
    if (userId) params.append('userId', userId);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await apiClient.get(`${this.BASE_PATH}?${params.toString()}`);
    return response.data as { data: { items: Notification[], pagination: any } };
  }

  static async getNotificationById(notificationId: string): Promise<Notification> {
    const response = await apiClient.get(`${this.BASE_PATH}/${notificationId}`);
    return response.data as Notification;
  }

  static async markAsRead(notificationId: string): Promise<void> {
    await apiClient.patch(`${this.BASE_PATH}/${notificationId}/read`);
  }

  static async markAllAsRead(userId: string): Promise<void> {
    await apiClient.patch(`${this.BASE_PATH}/users/${userId}/read-all`);
  }

  static async deleteNotification(notificationId: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/${notificationId}`);
  }

  static async sendNotification(notification: {
    userIds?: string[];
    type: string;
    priority: string;
    title: string;
    message: string;
    data?: Record<string, any>;
    channels: string[];
    scheduledAt?: string;
  }): Promise<{ notificationIds: string[] }> {
    const response = await apiClient.post(`${this.BASE_PATH}/send`, notification);
    return response.data as { notificationIds: string[] };
  }

  static async sendBulkNotification(notification: {
    targetType: 'ALL' | 'ROLE' | 'SCHOOL' | 'ROUTE' | 'CUSTOM';
    targetIds?: string[];
    type: string;
    priority: string;
    title: string;
    message: string;
    data?: Record<string, any>;
    channels: string[];
    scheduledAt?: string;
  }): Promise<{ jobId: string; estimatedRecipients: number }> {
    const response = await apiClient.post(`${this.BASE_PATH}/send-bulk`, notification);
    return response.data as { jobId: string; estimatedRecipients: number };
  }

  // Templates Management
  static async getNotificationTemplates(): Promise<{ data: { items: NotificationTemplate[] } }> {
    const response = await apiClient.get(`${this.BASE_PATH}/templates`);
    return response.data as { data: { items: NotificationTemplate[] } };
  }

  static async getTemplateById(templateId: string): Promise<NotificationTemplate> {
    const response = await apiClient.get(`${this.BASE_PATH}/templates/${templateId}`);
    return response.data as NotificationTemplate;
  }

  static async createTemplate(template: {
    name: string;
    type: string;
    title: string;
    message: string;
    channels: string[];
    variables?: string[];
  }): Promise<NotificationTemplate> {
    const response = await apiClient.post(`${this.BASE_PATH}/templates`, template);
    return response.data as NotificationTemplate;
  }

  static async updateTemplate(templateId: string, template: {
    name?: string;
    title?: string;
    message?: string;
    channels?: string[];
    variables?: string[];
    isActive?: boolean;
  }): Promise<NotificationTemplate> {
    const response = await apiClient.put(`${this.BASE_PATH}/templates/${templateId}`, template);
    return response.data as NotificationTemplate;
  }

  static async deleteTemplate(templateId: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/templates/${templateId}`);
  }

  // Subscription Management
  static async getUserSubscriptions(userId: string): Promise<{ data: { items: NotificationSubscription[] } }> {
    const response = await apiClient.get(`${this.BASE_PATH}/subscriptions/users/${userId}`);
    return response.data as { data: { items: NotificationSubscription[] } };
  }

  static async updateSubscription(subscriptionId: string, subscription: {
    channels?: string[];
    preferences?: {
      enabled?: boolean;
      quietHours?: {
        start: string;
        end: string;
      };
      frequency?: string;
    };
  }): Promise<NotificationSubscription> {
    const response = await apiClient.put(`${this.BASE_PATH}/subscriptions/${subscriptionId}`, subscription);
    return response.data as NotificationSubscription;
  }

  static async createSubscription(subscription: {
    userId: string;
    type: string;
    channels: string[];
    preferences: {
      enabled: boolean;
      quietHours?: {
        start: string;
        end: string;
      };
      frequency?: string;
    };
  }): Promise<NotificationSubscription> {
    const response = await apiClient.post(`${this.BASE_PATH}/subscriptions`, subscription);
    return response.data as NotificationSubscription;
  }

  // Statistics and Analytics
  static async getNotificationStats(filters?: {
    startDate?: string;
    endDate?: string;
    type?: string;
    userId?: string;
  }): Promise<NotificationStats> {
    const params = new URLSearchParams();
    
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.userId) params.append('userId', filters.userId);

    const response = await apiClient.get(`${this.BASE_PATH}/stats?${params.toString()}`);
    return response.data as NotificationStats;
  }

  static async getDeliveryReport(notificationId: string): Promise<{
    total: number;
    byStatus: Record<string, number>;
    byChannel: Record<string, number>;
    failures: Array<{
      userId: string;
      channel: string;
      error: string;
      timestamp: string;
    }>;
  }> {
    const response = await apiClient.get(`${this.BASE_PATH}/${notificationId}/delivery-report`);
    return (response.data as any).data;
  }

  // Real-time notifications (WebSocket integration)
  static async getUnreadCount(userId: string): Promise<{ count: number }> {
    const response = await apiClient.get(`${this.BASE_PATH}/users/${userId}/unread-count`);
    return response.data as { count: number };
  }

  static async testNotification(notification: {
    userId: string;
    type: string;
    title: string;
    message: string;
    channels: string[];
  }): Promise<{ success: boolean; results: Record<string, any> }> {
    const response = await apiClient.post(`${this.BASE_PATH}/test`, notification);
    return response.data as { success: boolean; results: Record<string, any> };
  }
}