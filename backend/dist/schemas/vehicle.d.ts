import { z } from 'zod';
export declare const createVehicleSchema: z.ZodObject<{
    licensePlate: z.ZodString;
    model: z.ZodString;
    capacity: z.ZodNumber;
    year: z.ZodOptional<z.ZodNumber>;
    schoolId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    licensePlate: string;
    model: string;
    capacity: number;
    schoolId: string;
    year?: number | undefined;
}, {
    licensePlate: string;
    model: string;
    capacity: number;
    schoolId: string;
    year?: number | undefined;
}>;
export declare const updateVehicleSchema: z.ZodObject<{
    licensePlate: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    capacity: z.ZodOptional<z.ZodNumber>;
    year: z.ZodOptional<z.ZodNumber>;
    schoolId: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    isActive?: boolean | undefined;
    year?: number | undefined;
    licensePlate?: string | undefined;
    model?: string | undefined;
    capacity?: number | undefined;
    schoolId?: string | undefined;
}, {
    isActive?: boolean | undefined;
    year?: number | undefined;
    licensePlate?: string | undefined;
    model?: string | undefined;
    capacity?: number | undefined;
    schoolId?: string | undefined;
}>;
export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>;
//# sourceMappingURL=vehicle.d.ts.map