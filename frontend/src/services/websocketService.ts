'use client';

import { io, Socket } from 'socket.io-client';
import { message } from 'antd';

export type WebSocketEventType = 
  | 'TRIP_LOCATION_UPDATE'
  | 'TRIP_STATUS_CHANGE'
  | 'STUDENT_STATUS_UPDATE'
  | 'ALERT_CREATED'
  | 'ALERT_ACKNOWLEDGED'
  | 'ALERT_RESOLVED'
  | 'EMERGENCY_REPORTED'
  | 'DRIVER_MESSAGE'
  | 'SYSTEM_NOTIFICATION'
  | 'ROUTE_UPDATE'
  | 'WEATHER_ALERT';

export interface WebSocketMessage {
  type: WebSocketEventType;
  data: any;
  timestamp: string;
  userId?: string;
  tripId?: string;
  routeId?: string;
  schoolId?: string;
}

export interface WebSocketConfig {
  url: string;
  reconnectInterval: number;
  maxReconnectAttempts: number;
  heartbeatInterval: number;
  enableLogging: boolean;
}

export type EventHandler = (data: any) => void;
export type ConnectionStatusHandler = (status: 'connected' | 'disconnected' | 'reconnecting' | 'error') => void;

class WebSocketService {
  private socket: Socket | null = null;
  private eventHandlers: Map<WebSocketEventType, EventHandler[]> = new Map();
  private connectionStatusHandlers: ConnectionStatusHandler[] = [];
  private config: WebSocketConfig;
  private reconnectAttempts = 0;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private isManuallyDisconnected = false;
  private userId: string | null = null;
  private subscriptions: Set<string> = new Set();

  constructor(config: Partial<WebSocketConfig> = {}) {
    this.config = {
      url: config.url || (typeof window !== 'undefined' ? 
        process.env.NEXT_PUBLIC_WS_URL || `http://${window.location.hostname}:5000` : 
        'http://localhost:5000'),
      reconnectInterval: config.reconnectInterval || 5000,
      maxReconnectAttempts: config.maxReconnectAttempts || 10,
      heartbeatInterval: config.heartbeatInterval || 30000,
      enableLogging: config.enableLogging ?? true,
    };
  }

  // Connection Management
  connect(userId?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (this.socket?.connected) {
          resolve();
          return;
        }

        this.userId = userId || null;
        this.isManuallyDisconnected = false;
        
        const socketOptions: any = {
          reconnection: true,
          reconnectionAttempts: this.config.maxReconnectAttempts,
          reconnectionDelay: this.config.reconnectInterval,
          transports: ['websocket', 'polling']
        };
        
        if (this.userId) {
          socketOptions.query = { userId: this.userId };
        }

        this.socket = io(this.config.url, socketOptions);
        
        this.socket.on('connect', () => {
          this.log('Socket.io connected');
          this.reconnectAttempts = 0;
          this.notifyConnectionStatus('connected');
          
          // Resubscribe to previous subscriptions
          this.subscriptions.forEach(subscription => {
            this.subscribe(subscription);
          });
          
          resolve();
        });

        this.socket.on('message', (data: any) => {
          this.handleMessage(JSON.stringify(data));
        });
        
        // Listen for all WebSocket event types
        Object.values([
          'TRIP_LOCATION_UPDATE', 'TRIP_STATUS_CHANGE', 'STUDENT_STATUS_UPDATE',
          'ALERT_CREATED', 'ALERT_ACKNOWLEDGED', 'ALERT_RESOLVED',
          'EMERGENCY_REPORTED', 'DRIVER_MESSAGE', 'SYSTEM_NOTIFICATION',
          'ROUTE_UPDATE', 'WEATHER_ALERT'
        ]).forEach(eventType => {
          this.socket?.on(eventType.toLowerCase(), (data: any) => {
            this.handleMessage(JSON.stringify({ type: eventType, data, timestamp: new Date().toISOString() }));
          });
        });

        this.socket.on('disconnect', (reason: string) => {
          this.log(`Socket.io disconnected: ${reason}`);
          this.notifyConnectionStatus('disconnected');
        });
        
        this.socket.on('reconnecting', () => {
          this.notifyConnectionStatus('reconnecting');
        });

        this.socket.on('connect_error', (error: any) => {
          this.log('Socket.io connection error:', error);
          this.notifyConnectionStatus('error');
          reject(error);
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect(): void {
    this.isManuallyDisconnected = true;
    this.clearReconnectTimer();
    
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    
    this.subscriptions.clear();
    this.log('Socket.io manually disconnected');
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) return;
    
    this.reconnectAttempts++;
    this.notifyConnectionStatus('reconnecting');
    
    this.log(`Scheduling reconnect attempt ${this.reconnectAttempts}/${this.config.maxReconnectAttempts} in ${this.config.reconnectInterval}ms`);
    
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect(this.userId || undefined).catch(() => {
        // Reconnection failed, will try again if attempts remain
      });
    }, this.config.reconnectInterval);
  }

  private clearReconnectTimer(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  // Heartbeat Management (Socket.io handles this automatically)
  private startHeartbeat(): void {
    // Socket.io handles heartbeat automatically
  }

  private stopHeartbeat(): void {
    // Socket.io handles heartbeat automatically
  }

  // Message Handling
  private handleMessage(rawMessage: string): void {
    try {
      const message: WebSocketMessage = JSON.parse(rawMessage);
      this.log('Received message:', message);
      
      // Handle heartbeat responses
      if (message.type === 'HEARTBEAT' as WebSocketEventType) {
        return;
      }
      
      // Trigger event handlers
      const handlers = this.eventHandlers.get(message.type) || [];
      handlers.forEach(handler => {
        try {
          handler(message.data);
        } catch (error) {
          this.log('Error in event handler:', error);
        }
      });
      
    } catch (error) {
      this.log('Error parsing WebSocket message:', error);
    }
  }

  // Send Messages
  send(message: WebSocketMessage): boolean {
    if (!this.socket?.connected) {
      this.log('Cannot send message: Socket.io not connected');
      return false;
    }
    
    try {
      this.socket.emit(message.type.toLowerCase(), message);
      this.log('Sent message:', message);
      return true;
    } catch (error) {
      this.log('Error sending message:', error);
      return false;
    }
  }

  // Event Subscription
  on(eventType: WebSocketEventType, handler: EventHandler): () => void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, []);
    }
    
    this.eventHandlers.get(eventType)!.push(handler);
    
    // Return unsubscribe function
    return () => {
      const handlers = this.eventHandlers.get(eventType) || [];
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    };
  }

  off(eventType: WebSocketEventType, handler?: EventHandler): void {
    if (!handler) {
      this.eventHandlers.delete(eventType);
      return;
    }
    
    const handlers = this.eventHandlers.get(eventType) || [];
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  }

  // Connection Status Subscription
  onConnectionStatus(handler: ConnectionStatusHandler): () => void {
    this.connectionStatusHandlers.push(handler);
    
    // Return unsubscribe function
    return () => {
      const index = this.connectionStatusHandlers.indexOf(handler);
      if (index > -1) {
        this.connectionStatusHandlers.splice(index, 1);
      }
    };
  }

  private notifyConnectionStatus(status: 'connected' | 'disconnected' | 'reconnecting' | 'error'): void {
    this.connectionStatusHandlers.forEach(handler => {
      try {
        handler(status);
      } catch (error) {
        this.log('Error in connection status handler:', error);
      }
    });
  }

  // Subscription Management
  subscribe(subscription: string): void {
    this.subscriptions.add(subscription);
    
    if (this.socket?.connected) {
      this.socket.emit('subscribe', { subscription });
    }
  }

  unsubscribe(subscription: string): void {
    this.subscriptions.delete(subscription);
    
    if (this.socket?.connected) {
      this.socket.emit('unsubscribe', { subscription });
    }
  }

  // Specific Subscriptions
  subscribeTripUpdates(tripId: string): void {
    this.subscribe(`trip:${tripId}`);
  }

  subscribeRouteUpdates(routeId: string): void {
    this.subscribe(`route:${routeId}`);
  }

  subscribeSchoolUpdates(schoolId: string): void {
    this.subscribe(`school:${schoolId}`);
  }

  subscribeDriverUpdates(driverId: string): void {
    this.subscribe(`driver:${driverId}`);
  }

  subscribeAlerts(): void {
    this.subscribe('alerts');
  }

  subscribeSystemNotifications(): void {
    this.subscribe('system');
  }

  // Convenience Methods for Sending Specific Events
  updateTripLocation(tripId: string, location: { latitude: number; longitude: number; timestamp: string }): boolean {
    return this.send({
      type: 'TRIP_LOCATION_UPDATE',
      data: { location },
      timestamp: new Date().toISOString(),
      tripId
    });
  }

  updateStudentStatus(tripId: string, studentId: string, status: string): boolean {
    return this.send({
      type: 'STUDENT_STATUS_UPDATE',
      data: { studentId, status },
      timestamp: new Date().toISOString(),
      tripId
    });
  }

  acknowledgeAlert(alertId: string): boolean {
    return this.send({
      type: 'ALERT_ACKNOWLEDGED',
      data: { alertId, acknowledgedBy: this.userId },
      timestamp: new Date().toISOString()
    });
  }

  // Utility Methods
  getConnectionState(): 'connecting' | 'open' | 'closing' | 'closed' {
    if (!this.socket) return 'closed';
    
    if (this.socket.connected) return 'open';
    if (this.socket.disconnected) return 'closed';
    return 'connecting';
  }

  isConnected(): boolean {
    return this.socket?.connected === true;
  }

  private log(message: string, ...args: any[]): void {
    if (this.config.enableLogging) {
      console.log(`[WebSocket] ${message}`, ...args);
    }
  }

  // Cleanup
  destroy(): void {
    this.disconnect();
    this.eventHandlers.clear();
    this.connectionStatusHandlers.length = 0;
  }
}

// Create singleton instance
let websocketService: WebSocketService | null = null;

export const getWebSocketService = (): WebSocketService => {
  if (!websocketService) {
    websocketService = new WebSocketService();
  }
  return websocketService;
};

// React Hook for WebSocket Integration
export const useWebSocket = (userId?: string) => {
  const ws = getWebSocketService();
  
  // Auto-connect when component mounts
  if (typeof window !== 'undefined' && userId) {
    ws.connect(userId).catch((error) => {
      message.error('Failed to connect to real-time updates');
      console.error('WebSocket connection error:', error);
    });
  }
  
  return ws;
};

export default WebSocketService;