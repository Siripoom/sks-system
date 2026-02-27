import { z } from 'zod';

export const createStudentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  grade: z.string().min(1, 'Grade is required'),
  schoolId: z.string().min(1, 'School ID is required'),
  guardianId: z.string().min(1, 'Guardian ID is required'),
});

export const updateStudentSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  grade: z.string().min(1, 'Grade is required').optional(),
  schoolId: z.string().min(1, 'School ID is required').optional(),
  guardianId: z.string().min(1, 'Guardian ID is required').optional(),
  isActive: z.boolean().optional(),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;