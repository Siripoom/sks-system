import { z } from 'zod';

export const createVehicleSchema = z.object({
  licensePlate: z.string().min(1, 'License plate is required'),
  model: z.string().min(1, 'Vehicle model is required'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  year: z.number().optional(),
  schoolId: z.string().min(1, 'School ID is required'),
});

export const updateVehicleSchema = z.object({
  licensePlate: z.string().min(1, 'License plate is required').optional(),
  model: z.string().min(1, 'Vehicle model is required').optional(),
  capacity: z.number().min(1, 'Capacity must be at least 1').optional(),
  year: z.number().optional(),
  schoolId: z.string().min(1, 'School ID is required').optional(),
  isActive: z.boolean().optional(),
});

export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>;