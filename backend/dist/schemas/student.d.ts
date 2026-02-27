import { z } from 'zod';
export declare const createStudentSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    grade: z.ZodString;
    schoolId: z.ZodString;
    guardianId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    schoolId: string;
    grade: string;
    guardianId: string;
}, {
    firstName: string;
    lastName: string;
    schoolId: string;
    grade: string;
    guardianId: string;
}>;
export declare const updateStudentSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    grade: z.ZodOptional<z.ZodString>;
    schoolId: z.ZodOptional<z.ZodString>;
    guardianId: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    isActive?: boolean | undefined;
    schoolId?: string | undefined;
    grade?: string | undefined;
    guardianId?: string | undefined;
}, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    isActive?: boolean | undefined;
    schoolId?: string | undefined;
    grade?: string | undefined;
    guardianId?: string | undefined;
}>;
export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
//# sourceMappingURL=student.d.ts.map