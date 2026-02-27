import { z } from 'zod';
export declare const createDriverSchema: z.ZodObject<{
    userId: z.ZodString;
    licenseNumber: z.ZodString;
    schoolId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    schoolId: string;
    licenseNumber: string;
}, {
    userId: string;
    schoolId: string;
    licenseNumber: string;
}>;
export declare const updateDriverSchema: z.ZodObject<{
    licenseNumber: z.ZodOptional<z.ZodString>;
    schoolId: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    isActive?: boolean | undefined;
    schoolId?: string | undefined;
    licenseNumber?: string | undefined;
}, {
    isActive?: boolean | undefined;
    schoolId?: string | undefined;
    licenseNumber?: string | undefined;
}>;
export type CreateDriverInput = z.infer<typeof createDriverSchema>;
export type UpdateDriverInput = z.infer<typeof updateDriverSchema>;
//# sourceMappingURL=driver.d.ts.map