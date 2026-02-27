'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { NotificationService } from '@/services/notificationService';
import type { 
  Notification, 
  NotificationTemplate, 
  NotificationSubscription, 
  NotificationStats 
} from '@/services/notificationService';

// Query Keys
const NOTIFICATION_KEYS = {
  all: ['notifications'] as const,
  user: (userId: string) => [...NOTIFICATION_KEYS.all, 'user', userId] as const,
  userNotifications: (userId: string, filters?: any) => [...NOTIFICATION_KEYS.user(userId), 'notifications', filters] as const,
  notification: (id: string) => [...NOTIFICATION_KEYS.all, 'notification', id] as const,
  templates: () => [...NOTIFICATION_KEYS.all, 'templates'] as const,
  template: (id: string) => [...NOTIFICATION_KEYS.all, 'template', id] as const,
  subscriptions: (userId: string) => [...NOTIFICATION_KEYS.all, 'subscriptions', userId] as const,
  stats: (filters?: any) => [...NOTIFICATION_KEYS.all, 'stats', filters] as const,
  unreadCount: (userId: string) => [...NOTIFICATION_KEYS.user(userId), 'unread-count'] as const,
};

// User Notifications
export const useUserNotifications = (userId?: string, filters?: any, refreshInterval?: number) => {
  return useQuery({
    queryKey: NOTIFICATION_KEYS.userNotifications(userId || '', filters),
    queryFn: () => NotificationService.getUserNotifications(userId, filters),
    enabled: !!userId,
    refetchInterval: refreshInterval,
    staleTime: 30000,
  });
};

export const useNotification = (notificationId: string) => {
  return useQuery({
    queryKey: NOTIFICATION_KEYS.notification(notificationId),
    queryFn: () => NotificationService.getNotificationById(notificationId),
    enabled: !!notificationId,
  });
};

export const useUnreadCount = (userId: string, refreshInterval: number = 30000) => {
  return useQuery({
    queryKey: NOTIFICATION_KEYS.unreadCount(userId),
    queryFn: () => NotificationService.getUnreadCount(userId),
    enabled: !!userId,
    refetchInterval: refreshInterval,
    staleTime: 15000,
  });
};

// Templates
export const useNotificationTemplates = () => {
  return useQuery({
    queryKey: NOTIFICATION_KEYS.templates(),
    queryFn: () => NotificationService.getNotificationTemplates(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useNotificationTemplate = (templateId: string) => {
  return useQuery({
    queryKey: NOTIFICATION_KEYS.template(templateId),
    queryFn: () => NotificationService.getTemplateById(templateId),
    enabled: !!templateId,
  });
};

// Subscriptions
export const useUserSubscriptions = (userId: string) => {
  return useQuery({
    queryKey: NOTIFICATION_KEYS.subscriptions(userId),
    queryFn: () => NotificationService.getUserSubscriptions(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Statistics
export const useNotificationStats = (filters?: any) => {
  return useQuery({
    queryKey: NOTIFICATION_KEYS.stats(filters),
    queryFn: () => NotificationService.getNotificationStats(filters),
    staleTime: 60 * 1000, // 1 minute
  });
};

// Mutations
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => NotificationService.markAsRead(notificationId),
    onSuccess: (_, notificationId) => {
      // Invalidate and refetch notification queries
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.all });
      message.success('Notification marked as read');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to mark notification as read';
      message.error(errorMessage);
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => NotificationService.markAllAsRead(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.all });
      message.success('All notifications marked as read');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to mark all notifications as read';
      message.error(errorMessage);
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => NotificationService.deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.all });
      message.success('Notification deleted');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to delete notification';
      message.error(errorMessage);
    },
  });
};

export const useSendNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notification: {
      userIds?: string[];
      type: string;
      priority: string;
      title: string;
      message: string;
      data?: Record<string, any>;
      channels: string[];
      scheduledAt?: string;
    }) => NotificationService.sendNotification(notification),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.all });
      message.success('Notification sent successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to send notification';
      message.error(errorMessage);
    },
  });
};

export const useSendBulkNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notification: {
      targetType: 'ALL' | 'ROLE' | 'SCHOOL' | 'ROUTE' | 'CUSTOM';
      targetIds?: string[];
      type: string;
      priority: string;
      title: string;
      message: string;
      data?: Record<string, any>;
      channels: string[];
      scheduledAt?: string;
    }) => NotificationService.sendBulkNotification(notification),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.all });
      message.success(`Bulk notification queued for ${data.estimatedRecipients} recipients`);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to send bulk notification';
      message.error(errorMessage);
    },
  });
};

export const useCreateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (template: {
      name: string;
      type: string;
      title: string;
      message: string;
      channels: string[];
      variables?: string[];
    }) => NotificationService.createTemplate(template),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.templates() });
      message.success('Template created successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create template';
      message.error(errorMessage);
    },
  });
};

export const useUpdateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ templateId, template }: {
      templateId: string;
      template: {
        name?: string;
        title?: string;
        message?: string;
        channels?: string[];
        variables?: string[];
        isActive?: boolean;
      };
    }) => NotificationService.updateTemplate(templateId, template),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.templates() });
      message.success('Template updated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update template';
      message.error(errorMessage);
    },
  });
};

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (templateId: string) => NotificationService.deleteTemplate(templateId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.templates() });
      message.success('Template deleted successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to delete template';
      message.error(errorMessage);
    },
  });
};

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ subscriptionId, subscription }: {
      subscriptionId: string;
      subscription: {
        channels?: string[];
        preferences?: {
          enabled?: boolean;
          quietHours?: {
            start: string;
            end: string;
          };
          frequency?: string;
        };
      };
    }) => NotificationService.updateSubscription(subscriptionId, subscription),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.all });
      message.success('Notification preferences updated');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update preferences';
      message.error(errorMessage);
    },
  });
};

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subscription: {
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
    }) => NotificationService.createSubscription(subscription),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.all });
      message.success('Subscription created successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create subscription';
      message.error(errorMessage);
    },
  });
};

export const useTestNotification = () => {
  return useMutation({
    mutationFn: (notification: {
      userId: string;
      type: string;
      title: string;
      message: string;
      channels: string[];
    }) => NotificationService.testNotification(notification),
    onSuccess: (data) => {
      if (data.success) {
        message.success('Test notification sent successfully');
      } else {
        message.warning('Test notification completed with some issues');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to send test notification';
      message.error(errorMessage);
    },
  });
};