'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { AdminService } from '@/services/adminService';
import type { SystemStats, SystemLog, AuditLog, SystemConfiguration, UserSession, SystemAlert, BackupInfo } from '@/services/adminService';

// Query Keys
const ADMIN_KEYS = {
  all: ['admin'] as const,
  stats: () => [...ADMIN_KEYS.all, 'stats'] as const,
  health: () => [...ADMIN_KEYS.all, 'health'] as const,
  logs: (filters?: any) => [...ADMIN_KEYS.all, 'logs', filters] as const,
  audit: (filters?: any) => [...ADMIN_KEYS.all, 'audit', filters] as const,
  sessions: () => [...ADMIN_KEYS.all, 'sessions'] as const,
  config: () => [...ADMIN_KEYS.all, 'config'] as const,
  alerts: (filters?: any) => [...ADMIN_KEYS.all, 'alerts', filters] as const,
  backups: () => [...ADMIN_KEYS.all, 'backups'] as const,
  database: () => [...ADMIN_KEYS.all, 'database'] as const,
  metrics: (timeRange?: string) => [...ADMIN_KEYS.all, 'metrics', timeRange] as const,
  processes: () => [...ADMIN_KEYS.all, 'processes'] as const,
  security: (filters?: any) => [...ADMIN_KEYS.all, 'security', filters] as const,
  updates: () => [...ADMIN_KEYS.all, 'updates'] as const,
};

// System Overview
export const useSystemStats = (refreshInterval?: number) => {
  return useQuery({
    queryKey: ADMIN_KEYS.stats(),
    queryFn: () => AdminService.getSystemStats(),
    refetchInterval: refreshInterval || 30000, // Default 30 seconds
    staleTime: 15000,
  });
};

export const useSystemHealth = (refreshInterval?: number) => {
  return useQuery({
    queryKey: ADMIN_KEYS.health(),
    queryFn: () => AdminService.getSystemHealth(),
    refetchInterval: refreshInterval || 10000, // Default 10 seconds
    staleTime: 5000,
  });
};

// Logging and Audit
export const useSystemLogs = (filters?: any) => {
  return useQuery({
    queryKey: ADMIN_KEYS.logs(filters),
    queryFn: () => AdminService.getSystemLogs(filters),
    staleTime: 30000,
  });
};

export const useAuditLogs = (filters?: any) => {
  return useQuery({
    queryKey: ADMIN_KEYS.audit(filters),
    queryFn: () => AdminService.getAuditLogs(filters),
    staleTime: 30000,
  });
};

// User Management
export const useActiveSessions = (refreshInterval?: number) => {
  return useQuery({
    queryKey: ADMIN_KEYS.sessions(),
    queryFn: () => AdminService.getActiveSessions(),
    refetchInterval: refreshInterval || 60000, // Default 1 minute
    staleTime: 30000,
  });
};

// Configuration
export const useSystemConfig = () => {
  return useQuery({
    queryKey: ADMIN_KEYS.config(),
    queryFn: () => AdminService.getSystemConfig(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Alerts
export const useSystemAlerts = (filters?: any, refreshInterval?: number) => {
  return useQuery({
    queryKey: ADMIN_KEYS.alerts(filters),
    queryFn: () => AdminService.getSystemAlerts(filters),
    refetchInterval: refreshInterval || 30000,
    staleTime: 15000,
  });
};

// Backup
export const useBackups = () => {
  return useQuery({
    queryKey: ADMIN_KEYS.backups(),
    queryFn: () => AdminService.getBackups(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Database
export const useDatabaseMetrics = (refreshInterval?: number) => {
  return useQuery({
    queryKey: ADMIN_KEYS.database(),
    queryFn: () => AdminService.getDatabaseMetrics(),
    refetchInterval: refreshInterval || 60000,
    staleTime: 30000,
  });
};

// Performance
export const usePerformanceMetrics = (timeRange?: string) => {
  return useQuery({
    queryKey: ADMIN_KEYS.metrics(timeRange),
    queryFn: () => AdminService.getPerformanceMetrics(timeRange as any),
    refetchInterval: 30000,
    staleTime: 15000,
  });
};

export const useSystemProcesses = (refreshInterval?: number) => {
  return useQuery({
    queryKey: ADMIN_KEYS.processes(),
    queryFn: () => AdminService.getSystemProcesses(),
    refetchInterval: refreshInterval || 10000,
    staleTime: 5000,
  });
};

// Security
export const useSecurityEvents = (filters?: any) => {
  return useQuery({
    queryKey: ADMIN_KEYS.security(filters),
    queryFn: () => AdminService.getSecurityEvents(filters),
    staleTime: 30000,
  });
};

// Updates
export const useSystemUpdates = () => {
  return useQuery({
    queryKey: ADMIN_KEYS.updates(),
    queryFn: () => AdminService.checkUpdates(),
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: false,
  });
};

// Mutations
export const useRestartSystem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (component?: string) => AdminService.restartSystem(component),
    onSuccess: () => {
      message.success('System restart initiated');
      // Refresh system health after restart
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.health() });
        queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.stats() });
      }, 5000);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to restart system';
      message.error(errorMessage);
    },
  });
};

export const useTerminateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => AdminService.terminateSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.sessions() });
      message.success('Session terminated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to terminate session';
      message.error(errorMessage);
    },
  });
};

export const useTerminateUserSessions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => AdminService.terminateUserSessions(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.sessions() });
      message.success('All user sessions terminated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to terminate user sessions';
      message.error(errorMessage);
    },
  });
};

export const useUpdateConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ key, value }: { key: string; value: string }) => AdminService.updateConfig(key, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.config() });
      message.success('Configuration updated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update configuration';
      message.error(errorMessage);
    },
  });
};

export const useResetConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (key: string) => AdminService.resetConfig(key),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.config() });
      message.success('Configuration reset to default');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to reset configuration';
      message.error(errorMessage);
    },
  });
};

export const useAcknowledgeAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (alertId: string) => AdminService.acknowledgeAlert(alertId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.alerts() });
      message.success('Alert acknowledged');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to acknowledge alert';
      message.error(errorMessage);
    },
  });
};

export const useResolveAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ alertId, resolution }: { alertId: string; resolution?: string }) => 
      AdminService.resolveAlert(alertId, resolution),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.alerts() });
      message.success('Alert resolved');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to resolve alert';
      message.error(errorMessage);
    },
  });
};

export const useCreateAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (alert: any) => AdminService.createAlert(alert),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.alerts() });
      message.success('Alert created');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create alert';
      message.error(errorMessage);
    },
  });
};

export const useCreateBackup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (type: 'FULL' | 'INCREMENTAL' | 'DIFFERENTIAL' = 'FULL') => AdminService.createBackup(type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.backups() });
      message.success('Backup started successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to start backup';
      message.error(errorMessage);
    },
  });
};

export const useRestoreBackup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (backupId: string) => AdminService.restoreBackup(backupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.backups() });
      message.success('Backup restoration started');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to restore backup';
      message.error(errorMessage);
    },
  });
};

export const useDeleteBackup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (backupId: string) => AdminService.deleteBackup(backupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.backups() });
      message.success('Backup deleted successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to delete backup';
      message.error(errorMessage);
    },
  });
};

export const useClearCache = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (type?: 'ALL' | 'REDIS' | 'APPLICATION' | 'DATABASE') => AdminService.clearCache(type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.stats() });
      message.success('Cache cleared successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to clear cache';
      message.error(errorMessage);
    },
  });
};

export const useRunMaintenance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tasks: string[]) => AdminService.runMaintenance(tasks),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.stats() });
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.database() });
      message.success('Maintenance tasks completed');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to run maintenance';
      message.error(errorMessage);
    },
  });
};

export const useOptimizeDatabase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AdminService.optimizeDatabase(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.database() });
      message.success('Database optimization completed');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to optimize database';
      message.error(errorMessage);
    },
  });
};

export const useCleanupFiles = () => {
  return useMutation({
    mutationFn: (olderThanDays: number) => AdminService.cleanupFiles(olderThanDays),
    onSuccess: (result) => {
      message.success(`Cleaned up ${result.deletedCount} files, freed ${(result.freedSpace / 1024 / 1024).toFixed(2)} MB`);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to cleanup files';
      message.error(errorMessage);
    },
  });
};

export const useCleanupLogs = () => {
  return useMutation({
    mutationFn: (olderThanDays: number) => AdminService.cleanupLogs(olderThanDays),
    onSuccess: (result) => {
      message.success(`Cleaned up ${result.deletedCount} log entries`);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to cleanup logs';
      message.error(errorMessage);
    },
  });
};

export const useBlockIP = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ip, reason, duration }: { ip: string; reason: string; duration?: number }) => 
      AdminService.blockIP(ip, reason, duration),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.security() });
      message.success('IP address blocked successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to block IP address';
      message.error(errorMessage);
    },
  });
};

export const useUnblockIP = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ip: string) => AdminService.unblockIP(ip),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.security() });
      message.success('IP address unblocked successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to unblock IP address';
      message.error(errorMessage);
    },
  });
};

export const useInstallUpdates = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AdminService.installUpdates(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.updates() });
      message.success('System update installation started');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to install updates';
      message.error(errorMessage);
    },
  });
};

export const useExportLogs = () => {
  return useMutation({
    mutationFn: ({ type, filters }: { type: 'system' | 'audit'; filters?: any }) => 
      AdminService.exportLogs(type, filters),
    onSuccess: (blob, variables) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${variables.type}_logs_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      message.success('Logs exported successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to export logs';
      message.error(errorMessage);
    },
  });
};