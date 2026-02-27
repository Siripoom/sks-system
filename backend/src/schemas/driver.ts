import { z } from 'zod';

export const createDriverSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  licenseNumber: z.string().min(1, 'License number is required'),
  schoolId: z.string().min(1, 'School ID is required'),
});

export const updateDriverSchema = z.object({
  licenseNumber: z.string().min(1, 'License number is required').optional(),
  schoolId: z.string().min(1, 'School ID is required').optional(),
  isActive: z.boolean().optional(),
});

export type CreateDriverInput = z.infer<typeof createDriverSchema>;
export type UpdateDriverInput = z.infer<typeof updateDriverSchema>;