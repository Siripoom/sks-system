'use client';

import apiClient from './apiClient';

export interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalStudents: number;
  totalDrivers: number;
  totalVehicles: number;
  activeVehicles: number;
  totalRoutes: number;
  activeRoutes: number;
  totalSchools: number;
  activeTrips: number;
  completedTripsToday: number;
  systemHealth: {
    status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
    uptime: number;
    memoryUsage: number;
    cpuUsage: number;
    diskUsage: number;
    lastBackup: string;
  };
  performance: {
    avgResponseTime: number;
    requestsPerMinute: number;
    errorRate: number;
    activeConnections: number;
  };
}

export interface SystemLog {
  id: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL';
  message: string;
  module: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface AuditLog {
  id: string;
  action: string;
  resource: string;
  resourceId: string;
  userId: string;
  userName: string;
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  ip: string;
  userAgent: string;
  timestamp: string;
  success: boolean;
  errorMessage?: string;
}

export interface SystemConfiguration {
  id: string;
  key: string;
  value: string;
  type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON';
  category: string;
  description: string;
  isEditable: boolean;
  lastModified: string;
  modifiedBy: string;
}

export interface UserSession {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  ip: string;
  userAgent: string;
  loginTime: string;
  lastActivity: string;
  isActive: boolean;
  location?: string;
  deviceType: string;
}

export interface SystemAlert {
  id: string;
  type: 'SYSTEM_ERROR' | 'SECURITY' | 'PERFORMANCE' | 'MAINTENANCE' | 'DATA_INTEGRITY';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  message: string;
  source: string;
  timestamp: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  metadata?: Record<string, any>;
}

export interface BackupInfo {
  id: string;
  type: 'FULL' | 'INCREMENTAL' | 'DIFFERENTIAL';
  status: 'RUNNING' | 'COMPLETED' | 'FAILED' | 'SCHEDULED';
  startTime: string;
  endTime?: string;
  size?: number;
  location: string;
  tables: string[];
  errors?: string[];
  metadata?: Record<string, any>;
}

export interface DatabaseMetrics {
  totalSize: number;
  tableCount: number;
  indexCount: number;
  connectionCount: number;
  averageQueryTime: number;
  slowQueries: {
    query: string;
    duration: number;
    timestamp: string;
    count: number;
  }[];
  topTables: {
    name: string;
    size: number;
    rowCount: number;
    lastModified: string;
  }[];
}

export class AdminService {
  private static readonly BASE_PATH = '/admin';

  // System Overview
  static async getSystemStats(): Promise<SystemStats> {
    const response = await apiClient.get(`${this.BASE_PATH}/stats`);
    return response.data as SystemStats;
  }

  static async getSystemHealth(): Promise<SystemStats['systemHealth']> {
    const response = await apiClient.get(`${this.BASE_PATH}/health`);
    return response.data as SystemStats['systemHealth'];
  }

  static async restartSystem(component?: string): Promise<void> {
    await apiClient.post(`${this.BASE_PATH}/restart`, { component });
  }

  // Logging and Audit
  static async getSystemLogs(filters?: {
    level?: string;
    module?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: { items: SystemLog[], pagination: any } }> {
    const params = new URLSearchParams();
    
    if (filters?.level) params.append('level', filters.level);
    if (filters?.module) params.append('module', filters.module);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await apiClient.get(`${this.BASE_PATH}/logs?${params.toString()}`);
    return response.data as { data: { items: SystemLog[], pagination: any } };
  }

  static async getAuditLogs(filters?: {
    action?: string;
    resource?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: { items: AuditLog[], pagination: any } }> {
    const params = new URLSearchParams();
    
    if (filters?.action) params.append('action', filters.action);
    if (filters?.resource) params.append('resource', filters.resource);
    if (filters?.userId) params.append('userId', filters.userId);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await apiClient.get(`${this.BASE_PATH}/audit?${params.toString()}`);
    return response.data as { data: { items: AuditLog[], pagination: any } };
  }

  static async exportLogs(type: 'system' | 'audit', filters?: any): Promise<Blob> {
    const response = await apiClient.post(`${this.BASE_PATH}/logs/export`, {
      type,
      filters
    }, {
      responseType: 'blob'
    });
    return response.data as Blob;
  }

  // User Management
  static async getActiveSessions(): Promise<{ data: { items: UserSession[] } }> {
    const response = await apiClient.get(`${this.BASE_PATH}/sessions`);
    return response.data as { data: { items: UserSession[] } };
  }

  static async terminateSession(sessionId: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/sessions/${sessionId}`);
  }

  static async terminateUserSessions(userId: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/users/${userId}/sessions`);
  }

  static async impersonateUser(userId: string, reason: string): Promise<{ token: string }> {
    const response = await apiClient.post(`${this.BASE_PATH}/impersonate`, {
      userId,
      reason
    });
    return response.data as { token: string };
  }

  // Configuration Management
  static async getSystemConfig(): Promise<{ data: { items: SystemConfiguration[] } }> {
    const response = await apiClient.get(`${this.BASE_PATH}/config`);
    return response.data as { data: { items: SystemConfiguration[] } };
  }

  static async updateConfig(key: string, value: string): Promise<void> {
    await apiClient.put(`${this.BASE_PATH}/config/${key}`, { value });
  }

  static async resetConfig(key: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/config/${key}`);
  }

  // System Alerts
  static async getSystemAlerts(filters?: {
    type?: string;
    severity?: string;
    acknowledged?: boolean;
    resolved?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ data: { items: SystemAlert[], pagination: any } }> {
    const params = new URLSearchParams();
    
    if (filters?.type) params.append('type', filters.type);
    if (filters?.severity) params.append('severity', filters.severity);
    if (filters?.acknowledged !== undefined) params.append('acknowledged', filters.acknowledged.toString());
    if (filters?.resolved !== undefined) params.append('resolved', filters.resolved.toString());
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await apiClient.get(`${this.BASE_PATH}/alerts?${params.toString()}`);
    return response.data as { data: { items: SystemAlert[], pagination: any } };
  }

  static async acknowledgeAlert(alertId: string): Promise<void> {
    await apiClient.patch(`${this.BASE_PATH}/alerts/${alertId}/acknowledge`);
  }

  static async resolveAlert(alertId: string, resolution?: string): Promise<void> {
    await apiClient.patch(`${this.BASE_PATH}/alerts/${alertId}/resolve`, { resolution });
  }

  static async createAlert(alert: {
    type: string;
    severity: string;
    title: string;
    message: string;
    source: string;
    metadata?: Record<string, any>;
  }): Promise<SystemAlert> {
    const response = await apiClient.post(`${this.BASE_PATH}/alerts`, alert);
    return response.data as SystemAlert;
  }

  // Backup and Maintenance
  static async getBackups(): Promise<{ data: { items: BackupInfo[] } }> {
    const response = await apiClient.get(`${this.BASE_PATH}/backups`);
    return response.data as { data: { items: BackupInfo[] } };
  }

  static async createBackup(type: 'FULL' | 'INCREMENTAL' | 'DIFFERENTIAL' = 'FULL'): Promise<{ backupId: string }> {
    const response = await apiClient.post(`${this.BASE_PATH}/backups`, { type });
    return response.data as { backupId: string };
  }

  static async restoreBackup(backupId: string): Promise<void> {
    await apiClient.post(`${this.BASE_PATH}/backups/${backupId}/restore`);
  }

  static async deleteBackup(backupId: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/backups/${backupId}`);
  }

  static async scheduleBackup(schedule: {
    type: 'FULL' | 'INCREMENTAL' | 'DIFFERENTIAL';
    frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
    time: string;
    enabled: boolean;
  }): Promise<void> {
    await apiClient.post(`${this.BASE_PATH}/backups/schedule`, schedule);
  }

  // Database Management
  static async getDatabaseMetrics(): Promise<DatabaseMetrics> {
    const response = await apiClient.get(`${this.BASE_PATH}/database/metrics`);
    return response.data as DatabaseMetrics;
  }

  static async optimizeDatabase(): Promise<void> {
    await apiClient.post(`${this.BASE_PATH}/database/optimize`);
  }

  static async analyzeTables(): Promise<void> {
    await apiClient.post(`${this.BASE_PATH}/database/analyze`);
  }

  static async rebuildIndexes(): Promise<void> {
    await apiClient.post(`${this.BASE_PATH}/database/reindex`);
  }

  // System Maintenance
  static async clearCache(type?: 'ALL' | 'REDIS' | 'APPLICATION' | 'DATABASE'): Promise<void> {
    await apiClient.post(`${this.BASE_PATH}/cache/clear`, { type });
  }

  static async runMaintenance(tasks: string[]): Promise<{ results: Record<string, any> }> {
    const response = await apiClient.post(`${this.BASE_PATH}/maintenance`, { tasks });
    return response.data as { results: Record<string, any> };
  }

  static async cleanupFiles(olderThanDays: number): Promise<{ deletedCount: number; freedSpace: number }> {
    const response = await apiClient.post(`${this.BASE_PATH}/cleanup/files`, { olderThanDays });
    return response.data as { deletedCount: number; freedSpace: number };
  }

  static async cleanupLogs(olderThanDays: number): Promise<{ deletedCount: number }> {
    const response = await apiClient.post(`${this.BASE_PATH}/cleanup/logs`, { olderThanDays });
    return response.data as { deletedCount: number };
  }

  // Monitoring and Performance
  static async getPerformanceMetrics(timeRange: '1h' | '24h' | '7d' | '30d' = '24h'): Promise<{
    cpu: { timestamp: string; value: number }[];
    memory: { timestamp: string; value: number }[];
    disk: { timestamp: string; value: number }[];
    network: { timestamp: string; received: number; transmitted: number }[];
    responseTime: { timestamp: string; value: number }[];
    requests: { timestamp: string; value: number }[];
    errors: { timestamp: string; value: number }[];
  }> {
    const response = await apiClient.get(`${this.BASE_PATH}/metrics?timeRange=${timeRange}`);
    return response.data as {
      cpu: { timestamp: string; value: number }[];
      memory: { timestamp: string; value: number }[];
      disk: { timestamp: string; value: number }[];
      network: { timestamp: string; received: number; transmitted: number }[];
      responseTime: { timestamp: string; value: number }[];
      requests: { timestamp: string; value: number }[];
      errors: { timestamp: string; value: number }[];
    };
  }

  static async getSystemProcesses(): Promise<{
    processes: {
      pid: number;
      name: string;
      cpu: number;
      memory: number;
      status: string;
      startTime: string;
    }[];
  }> {
    const response = await apiClient.get(`${this.BASE_PATH}/processes`);
    return response.data as {
      processes: {
        pid: number;
        name: string;
        cpu: number;
        memory: number;
        status: string;
        startTime: string;
      }[];
    };
  }

  // Security Management
  static async getSecurityEvents(filters?: {
    type?: string;
    severity?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: { items: any[], pagination: any } }> {
    const params = new URLSearchParams();
    
    if (filters?.type) params.append('type', filters.type);
    if (filters?.severity) params.append('severity', filters.severity);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await apiClient.get(`${this.BASE_PATH}/security/events?${params.toString()}`);
    return response.data as { data: { items: any[], pagination: any } };
  }

  static async blockIP(ip: string, reason: string, duration?: number): Promise<void> {
    await apiClient.post(`${this.BASE_PATH}/security/block-ip`, {
      ip,
      reason,
      duration
    });
  }

  static async unblockIP(ip: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/security/block-ip/${ip}`);
  }

  static async getBlockedIPs(): Promise<{ data: { items: any[] } }> {
    const response = await apiClient.get(`${this.BASE_PATH}/security/blocked-ips`);
    return response.data as { data: { items: any[] } };
  }

  // System Updates
  static async checkUpdates(): Promise<{
    available: boolean;
    currentVersion: string;
    latestVersion: string;
    updates: {
      version: string;
      releaseDate: string;
      description: string;
      critical: boolean;
    }[];
  }> {
    const response = await apiClient.get(`${this.BASE_PATH}/updates/check`);
    return response.data as {
      available: boolean;
      currentVersion: string;
      latestVersion: string;
      updates: {
        version: string;
        releaseDate: string;
        description: string;
        critical: boolean;
      }[];
    };
  }

  static async installUpdates(): Promise<{ updateId: string }> {
    const response = await apiClient.post(`${this.BASE_PATH}/updates/install`);
    return response.data as { updateId: string };
  }

  static async getUpdateStatus(updateId: string): Promise<{
    status: 'PENDING' | 'DOWNLOADING' | 'INSTALLING' | 'COMPLETED' | 'FAILED';
    progress: number;
    message: string;
  }> {
    const response = await apiClient.get(`${this.BASE_PATH}/updates/${updateId}/status`);
    return response.data as {
      status: 'PENDING' | 'DOWNLOADING' | 'INSTALLING' | 'COMPLETED' | 'FAILED';
      progress: number;
      message: string;
    };
  }
}