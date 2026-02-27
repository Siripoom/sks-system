'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { TrackingService, type TripTrackingFilters, type TripTracking, type LocationData, type TrackingAlert } from '@/services/trackingService';

// Query Keys
const TRACKING_KEYS = {
  all: ['tracking'] as const,
  activeTrips: (filters?: TripTrackingFilters) => [...TRACKING_KEYS.all, 'active-trips', filters] as const,
  tripTracking: (tripId: string) => [...TRACKING_KEYS.all, 'trip', tripId] as const,
  alerts: () => [...TRACKING_KEYS.all, 'alerts'] as const,
  studentTracking: (studentId: string) => [...TRACKING_KEYS.all, 'student', studentId] as const,
  stats: (filters?: any) => [...TRACKING_KEYS.all, 'stats', filters] as const,
  driverMessages: (driverId: string) => [...TRACKING_KEYS.all, 'driver-messages', driverId] as const,
  eta: (tripId: string, stopId: string) => [...TRACKING_KEYS.all, 'eta', tripId, stopId] as const,
  studentETA: (studentId: string, date?: string) => [...TRACKING_KEYS.all, 'student-eta', studentId, date] as const,
  tripHistory: (tripId: string) => [...TRACKING_KEYS.all, 'trip-history', tripId] as const,
  weather: (routeId: string, date: string) => [...TRACKING_KEYS.all, 'weather', routeId, date] as const,
  driverPerformance: (driverId: string, period: string) => [...TRACKING_KEYS.all, 'driver-performance', driverId, period] as const,
  vehiclePerformance: (vehicleId: string, period: string) => [...TRACKING_KEYS.all, 'vehicle-performance', vehicleId, period] as const,
};

// Active Trips Tracking
export const useActiveTrips = (filters?: TripTrackingFilters, refreshInterval?: number | false) => {
  return useQuery({
    queryKey: TRACKING_KEYS.activeTrips(filters),
    queryFn: () => TrackingService.getActiveTrips(filters),
    refetchInterval: refreshInterval || 5000, // Real-time updates every 5 seconds
    staleTime: 2000, // Consider data stale after 2 seconds
    refetchIntervalInBackground: true, // Continue refreshing in background
  });
};

export const useTripTracking = (tripId: string, refreshInterval: number = 3000) => {
  return useQuery({
    queryKey: TRACKING_KEYS.tripTracking(tripId),
    queryFn: () => TrackingService.getTripTracking(tripId),
    enabled: !!tripId,
    refetchInterval: refreshInterval, // Very frequent updates for active trip
    staleTime: 1000, // Very short stale time for real-time data
    refetchIntervalInBackground: true,
  });
};

// Student Tracking for Parents
export const useStudentTracking = (studentId: string, refreshInterval: number = 10000) => {
  return useQuery({
    queryKey: TRACKING_KEYS.studentTracking(studentId),
    queryFn: () => TrackingService.getStudentTripTracking(studentId),
    enabled: !!studentId,
    refetchInterval: refreshInterval, // Updates every 10 seconds for parents
    staleTime: 5000,
    refetchIntervalInBackground: true,
  });
};

// Alerts
export const useActiveAlerts = (refreshInterval?: number | false) => {
  return useQuery({
    queryKey: TRACKING_KEYS.alerts(),
    queryFn: () => TrackingService.getActiveAlerts(),
    refetchInterval: refreshInterval || 15000, // Check for new alerts every 15 seconds
    staleTime: 10000,
    refetchIntervalInBackground: true,
  });
};

// ETA Tracking
export const useStopETA = (tripId: string, stopId: string, refreshInterval: number = 30000) => {
  return useQuery({
    queryKey: TRACKING_KEYS.eta(tripId, stopId),
    queryFn: () => TrackingService.getETAForStop(tripId, stopId),
    enabled: !!(tripId && stopId),
    refetchInterval: refreshInterval, // Update ETA every 30 seconds
    staleTime: 15000,
    refetchIntervalInBackground: true,
  });
};

export const useStudentETA = (studentId: string, date?: string, refreshInterval: number = 30000) => {
  return useQuery({
    queryKey: TRACKING_KEYS.studentETA(studentId, date),
    queryFn: () => TrackingService.getETAForStudent(studentId, date),
    enabled: !!studentId,
    refetchInterval: refreshInterval,
    staleTime: 15000,
    refetchIntervalInBackground: true,
  });
};

// Driver Messages
export const useDriverMessages = (driverId: string, unreadOnly?: boolean) => {
  return useQuery({
    queryKey: TRACKING_KEYS.driverMessages(driverId),
    queryFn: () => TrackingService.getDriverMessages(driverId, unreadOnly),
    enabled: !!driverId,
    refetchInterval: 10000, // Check messages every 10 seconds
    staleTime: 5000,
  });
};

// Stats and Analytics
export const useTrackingStats = (filters?: any, refreshInterval?: number | false) => {
  return useQuery({
    queryKey: TRACKING_KEYS.stats(filters),
    queryFn: () => TrackingService.getTrackingStats(filters),
    refetchInterval: refreshInterval || 60000, // Update stats every minute
    staleTime: 30000,
  });
};

// Historical Data
export const useTripHistory = (tripId: string) => {
  return useQuery({
    queryKey: TRACKING_KEYS.tripHistory(tripId),
    queryFn: () => TrackingService.getTripHistory(tripId),
    enabled: !!tripId,
    staleTime: 5 * 60 * 1000, // Historical data doesn't change often
  });
};

// Weather Data
export const useWeatherForRoute = (routeId: string, date: string) => {
  return useQuery({
    queryKey: TRACKING_KEYS.weather(routeId, date),
    queryFn: () => TrackingService.getWeatherForRoute(routeId, date),
    enabled: !!(routeId && date),
    staleTime: 15 * 60 * 1000, // Weather updates every 15 minutes
    refetchInterval: 15 * 60 * 1000,
  });
};

// Performance Data
export const useDriverPerformance = (driverId: string, period: string) => {
  return useQuery({
    queryKey: TRACKING_KEYS.driverPerformance(driverId, period),
    queryFn: () => TrackingService.getDriverPerformance(driverId, period),
    enabled: !!(driverId && period),
    staleTime: 30 * 60 * 1000, // Performance data updates every 30 minutes
  });
};

export const useVehiclePerformance = (vehicleId: string, period: string) => {
  return useQuery({
    queryKey: TRACKING_KEYS.vehiclePerformance(vehicleId, period),
    queryFn: () => TrackingService.getVehiclePerformance(vehicleId, period),
    enabled: !!(vehicleId && period),
    staleTime: 30 * 60 * 1000,
  });
};

// Location and Status Updates
export const useUpdateTripLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, location }: { tripId: string; location: LocationData }) =>
      TrackingService.updateTripLocation(tripId, location),
    onSuccess: (_, { tripId }) => {
      // Invalidate trip tracking to get fresh data
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.tripTracking(tripId) });
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.activeTrips() });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update location';
      message.error(errorMessage);
    },
  });
};

export const useUpdateTripStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, status, metadata }: { tripId: string; status: string; metadata?: Record<string, any> }) =>
      TrackingService.updateTripStatus(tripId, status, metadata),
    onSuccess: (updatedTrip, { tripId }) => {
      // Update the specific trip
      queryClient.setQueryData(TRACKING_KEYS.tripTracking(tripId), updatedTrip);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.activeTrips() });
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.stats() });
      
      message.success('Trip status updated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update trip status';
      message.error(errorMessage);
    },
  });
};

// Stop Management
export const useArriveAtStop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, stopId, location }: { tripId: string; stopId: string; location: LocationData }) =>
      TrackingService.arriveAtStop(tripId, stopId, location),
    onSuccess: (updatedTrip, { tripId }) => {
      queryClient.setQueryData(TRACKING_KEYS.tripTracking(tripId), updatedTrip);
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.activeTrips() });
      message.success('Arrived at stop');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to record arrival';
      message.error(errorMessage);
    },
  });
};

export const useDepartFromStop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, stopId }: { tripId: string; stopId: string }) =>
      TrackingService.departFromStop(tripId, stopId),
    onSuccess: (updatedTrip, { tripId }) => {
      queryClient.setQueryData(TRACKING_KEYS.tripTracking(tripId), updatedTrip);
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.activeTrips() });
      message.success('Departed from stop');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to record departure';
      message.error(errorMessage);
    },
  });
};

export const useSkipStop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, stopId, reason }: { tripId: string; stopId: string; reason: string }) =>
      TrackingService.skipStop(tripId, stopId, reason),
    onSuccess: (updatedTrip, { tripId }) => {
      queryClient.setQueryData(TRACKING_KEYS.tripTracking(tripId), updatedTrip);
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.activeTrips() });
      message.success('Stop marked as skipped');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to skip stop';
      message.error(errorMessage);
    },
  });
};

// Student Status Updates
export const useUpdateStudentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, studentId, status, stopId }: { 
      tripId: string; 
      studentId: string; 
      status: 'PICKED_UP' | 'DROPPED_OFF' | 'ABSENT' | 'NO_SHOW';
      stopId?: string;
    }) => TrackingService.updateStudentStatus(tripId, studentId, status, stopId),
    onSuccess: (_, { tripId, studentId }) => {
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.tripTracking(tripId) });
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.studentTracking(studentId) });
      message.success('Student status updated');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update student status';
      message.error(errorMessage);
    },
  });
};

export const useBulkUpdateStudentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, updates }: { 
      tripId: string; 
      updates: { studentId: string; status: string; stopId?: string; }[]
    }) => TrackingService.bulkUpdateStudentStatus(tripId, updates),
    onSuccess: (_, { tripId, updates }) => {
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.tripTracking(tripId) });
      updates.forEach(update => {
        queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.studentTracking(update.studentId) });
      });
      message.success(`${updates.length} student statuses updated`);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update student statuses';
      message.error(errorMessage);
    },
  });
};

// Alert Management
export const useCreateAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, alert }: { 
      tripId: string; 
      alert: { type: string; message: string; severity: string; metadata?: Record<string, any>; }
    }) => TrackingService.createAlert(tripId, alert),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.alerts() });
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.activeTrips() });
      message.success('Alert created successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create alert';
      message.error(errorMessage);
    },
  });
};

export const useAcknowledgeAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (alertId: string) => TrackingService.acknowledgeAlert(alertId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.alerts() });
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
      TrackingService.resolveAlert(alertId, resolution),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.alerts() });
      message.success('Alert resolved');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to resolve alert';
      message.error(errorMessage);
    },
  });
};

// Emergency Management
export const useReportEmergency = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, emergency }: { tripId: string; emergency: any }) =>
      TrackingService.reportEmergency(tripId, emergency),
    onSuccess: (emergencyId) => {
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.alerts() });
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.activeTrips() });
      message.success(`Emergency reported (ID: ${emergencyId})`);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to report emergency';
      message.error(errorMessage);
    },
  });
};

// Driver Communication
export const useSendMessageToDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ driverId, message: driverMessage }: { driverId: string; message: any }) =>
      TrackingService.sendMessageToDriver(driverId, driverMessage),
    onSuccess: (messageId, { driverId }) => {
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.driverMessages(driverId) });
      message.success('Message sent to driver');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to send message';
      message.error(errorMessage);
    },
  });
};

// Geofence Check
export const useGeofenceCheck = () => {
  return useMutation({
    mutationFn: ({ tripId, location }: { tripId: string; location: LocationData }) =>
      TrackingService.checkGeofence(tripId, location),
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to check geofence';
      message.error(errorMessage);
    },
  });
};

// Export Data
export const useExportTrackingData = () => {
  return useMutation({
    mutationFn: (filters: any) => TrackingService.exportTrackingData(filters),
    onSuccess: (blob, filters) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const format = filters.format?.toLowerCase() || 'csv';
      link.download = `tracking_data_${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      message.success('Tracking data exported successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to export tracking data';
      message.error(errorMessage);
    },
  });
};

// Vehicle Issue Reporting
export const useReportVehicleIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, issue }: { tripId: string; issue: any }) =>
      TrackingService.reportVehicleIssue(tripId, issue),
    onSuccess: (issueId, { tripId }) => {
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.tripTracking(tripId) });
      queryClient.invalidateQueries({ queryKey: TRACKING_KEYS.alerts() });
      message.success(`Vehicle issue reported (ID: ${issueId})`);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to report vehicle issue';
      message.error(errorMessage);
    },
  });
};