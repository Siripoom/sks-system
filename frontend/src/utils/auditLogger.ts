// Comprehensive audit logging utility
export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userRole: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: 'AUTH' | 'DATA' | 'SYSTEM' | 'SECURITY' | 'USER' | 'TRIP';
  status: 'SUCCESS' | 'FAILURE' | 'WARNING';
}

class AuditLogger {
  private static instance: AuditLogger;
  private logs: AuditLog[] = [];
  private maxLocalLogs = 100; // Keep last 100 logs locally

  public static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }

  public log(entry: Omit<AuditLog, 'id' | 'timestamp' | 'ipAddress' | 'userAgent'>) {
    const auditEntry: AuditLog = {
      ...entry,
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      ipAddress: this.getClientIP(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown'
    };

    // Add to local logs
    this.logs.unshift(auditEntry);
    if (this.logs.length > this.maxLocalLogs) {
      this.logs = this.logs.slice(0, this.maxLocalLogs);
    }

    // Send to server (in background)
    this.sendToServer(auditEntry).catch(console.error);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Audit Log:', auditEntry);
    }

    return auditEntry.id;
  }

  // Specific audit logging methods
  public logAuth(action: string, userId: string, userRole: string, status: 'SUCCESS' | 'FAILURE', details: Record<string, any> = {}) {
    return this.log({
      userId,
      userRole,
      action,
      resource: 'authentication',
      details,
      severity: status === 'FAILURE' ? 'HIGH' : 'LOW',
      category: 'AUTH',
      status
    });
  }

  public logDataAccess(userId: string, userRole: string, resource: string, resourceId: string, action: string, details: Record<string, any> = {}) {
    return this.log({
      userId,
      userRole,
      action,
      resource,
      resourceId,
      details,
      severity: 'MEDIUM',
      category: 'DATA',
      status: 'SUCCESS'
    });
  }

  public logSecurityEvent(userId: string, userRole: string, event: string, severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL', details: Record<string, any> = {}) {
    return this.log({
      userId,
      userRole,
      action: event,
      resource: 'security',
      details,
      severity,
      category: 'SECURITY',
      status: 'WARNING'
    });
  }

  public logUserAction(userId: string, userRole: string, action: string, resource: string, resourceId?: string, status: 'SUCCESS' | 'FAILURE' = 'SUCCESS', details: Record<string, any> = {}) {
    return this.log({
      userId,
      userRole,
      action,
      resource,
      resourceId,
      details,
      severity: 'LOW',
      category: 'USER',
      status
    });
  }

  public logTripEvent(userId: string, userRole: string, tripId: string, event: string, details: Record<string, any> = {}) {
    return this.log({
      userId,
      userRole,
      action: event,
      resource: 'trip',
      resourceId: tripId,
      details,
      severity: 'MEDIUM',
      category: 'TRIP',
      status: 'SUCCESS'
    });
  }

  public logSystemEvent(event: string, severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL', details: Record<string, any> = {}) {
    return this.log({
      userId: 'system',
      userRole: 'SYSTEM',
      action: event,
      resource: 'system',
      details,
      severity,
      category: 'SYSTEM',
      status: 'SUCCESS'
    });
  }

  public getLocalLogs(): AuditLog[] {
    return [...this.logs];
  }

  public clearLocalLogs(): void {
    this.logs = [];
  }

  private async sendToServer(entry: AuditLog): Promise<void> {
    try {
      const response = await fetch('/api/audit/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry)
      });

      if (!response.ok) {
        throw new Error(`Failed to send audit log: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to send audit log to server:', error);
      // Could implement retry logic or offline storage here
    }
  }

  private generateId(): string {
    return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getClientIP(): string {
    // In a real implementation, this would get the client IP from headers
    // For client-side, we can't directly get the real IP
    return 'client-side';
  }
}

// Export singleton instance
export const auditLogger = AuditLogger.getInstance();

// Convenience functions
export const logAuth = auditLogger.logAuth.bind(auditLogger);
export const logDataAccess = auditLogger.logDataAccess.bind(auditLogger);
export const logSecurityEvent = auditLogger.logSecurityEvent.bind(auditLogger);
export const logUserAction = auditLogger.logUserAction.bind(auditLogger);
export const logTripEvent = auditLogger.logTripEvent.bind(auditLogger);
export const logSystemEvent = auditLogger.logSystemEvent.bind(auditLogger);

export default AuditLogger;