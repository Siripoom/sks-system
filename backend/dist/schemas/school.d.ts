import { z } from 'zod';
export declare const createSchoolSchema: z.ZodObject<{
    name: z.ZodString;
    address: z.ZodString;
    phone: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    phone: string;
    name: string;
    address: string;
    email?: string | undefined;
}, {
    phone: string;
    name: string;
    address: string;
    email?: string | undefined;
}>;
export declare const updateSchoolSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    phone?: string | undefined;
    isActive?: boolean | undefined;
    name?: string | undefined;
    address?: string | undefined;
}, {
    email?: string | undefined;
    phone?: string | undefined;
    isActive?: boolean | undefined;
    name?: string | undefined;
    address?: string | undefined;
}>;
export type CreateSchoolInput = z.infer<typeof createSchoolSchema>;
export type UpdateSchoolInput = z.infer<typeof updateSchoolSchema>;
//# sourceMappingURL=school.d.ts.map