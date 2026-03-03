import { z } from 'zod';

// Route Schemas
export const createRouteSchema = z.object({
  routeName: z.string().min(3, 'Route name must be at least 3 characters').max(100, 'Route name must not exceed 100 characters'),
  description: z.string().max(500, 'Description must not exceed 500 characters').optional(),
  schoolId: z.string().cuid('Invalid school ID'),
  distance: z.number().min(0, 'Distance must be positive').optional(),
  estimatedDuration: z.number().min(60, 'Duration must be at least 60 seconds').optional(), // in seconds
  isActive: z.boolean().optional().default(true),
});

export const updateRouteSchema = z.object({
  routeName: z.string().min(3, 'Route name must be at least 3 characters').max(100, 'Route name must not exceed 100 characters').optional(),
  description: z.string().max(500, 'Description must not exceed 500 characters').optional(),
  schoolId: z.string().cuid('Invalid school ID').optional(),
  distance: z.number().min(0, 'Distance must be positive').optional(),
  estimatedDuration: z.number().min(60, 'Duration must be at least 60 seconds').optional(), // in seconds
  isActive: z.boolean().optional(),
});

// Stop Schemas
export const createStopSchema = z.object({
  name: z.string().min(1, 'Stop name is required').max(100, 'Stop name must not exceed 100 characters'),
  address: z.string().min(1, 'Address is required').max(200, 'Address must not exceed 200 characters'),
  routeId: z.string().cuid('Invalid route ID'),
  stopOrder: z.number().int().min(1, 'Stop order must be at least 1'),
  estimatedArrival: z.string().max(10, 'Estimated arrival must not exceed 10 characters').optional(),
  latitude: z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90').optional(),
  longitude: z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180').optional(),
  isActive: z.boolean().optional().default(true),
});

export const updateStopSchema = z.object({
  name: z.string().min(1, 'Stop name is required').max(100, 'Stop name must not exceed 100 characters').optional(),
  address: z.string().min(1, 'Address is required').max(200, 'Address must not exceed 200 characters').optional(),
  stopOrder: z.number().int().min(1, 'Stop order must be at least 1').optional(),
  estimatedArrival: z.string().max(10, 'Estimated arrival must not exceed 10 characters').optional(),
  latitude: z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90').optional(),
  longitude: z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180').optional(),
  isActive: z.boolean().optional(),
});

// Reorder stops schema
export const reorderStopsSchema = z.object({
  stopOrders: z.array(z.object({
    stopId: z.string().cuid('Invalid stop ID'),
    order: z.number().int().min(1, 'Order must be at least 1'),
  })).min(1, 'At least one stop order is required'),
});

// Assignment Schemas
export const assignStudentsSchema = z.object({
  assignments: z.array(z.object({
    studentId: z.string().cuid('Invalid student ID'),
    stopId: z.string().cuid('Invalid stop ID'),
  })).min(1, 'At least one assignment is required'),
});

// Bulk operations
export const bulkUpdateRoutesSchema = z.object({
  routeIds: z.array(z.string().cuid('Invalid route ID')).min(1, 'At least one route ID is required'),
  updates: z.object({
    isActive: z.boolean().optional(),
    schoolId: z.string().cuid('Invalid school ID').optional(),
  }),
});

// Duplicate route schema
export const duplicateRouteSchema = z.object({
  routeName: z.string().min(3, 'Route name must be at least 3 characters').max(100, 'Route name must not exceed 100 characters'),
});

// Query filters
export const routeFiltersSchema = z.object({
  page: z.string().regex(/^\d+$/, 'Page must be a number').transform(Number).optional(),
  limit: z.string().regex(/^\d+$/, 'Limit must be a number').transform(Number).optional(),
  search: z.string().max(200, 'Search term too long').optional(),
  schoolId: z.string().cuid('Invalid school ID').optional(),
  isActive: z.string().regex(/^(true|false)$/, 'isActive must be true or false').transform(val => val === 'true').optional(),
});

// Export types
export type CreateRouteInput = z.infer<typeof createRouteSchema>;
export type UpdateRouteInput = z.infer<typeof updateRouteSchema>;
export type CreateStopInput = z.infer<typeof createStopSchema>;
export type UpdateStopInput = z.infer<typeof updateStopSchema>;
export type ReorderStopsInput = z.infer<typeof reorderStopsSchema>;
export type AssignStudentsInput = z.infer<typeof assignStudentsSchema>;
export type BulkUpdateRoutesInput = z.infer<typeof bulkUpdateRoutesSchema>;
export type DuplicateRouteInput = z.infer<typeof duplicateRouteSchema>;
export type RouteFiltersInput = z.infer<typeof routeFiltersSchema>;