"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVehicleSchema = exports.createVehicleSchema = void 0;
const zod_1 = require("zod");
exports.createVehicleSchema = zod_1.z.object({
    licensePlate: zod_1.z.string().min(1, 'License plate is required'),
    model: zod_1.z.string().min(1, 'Vehicle model is required'),
    capacity: zod_1.z.number().min(1, 'Capacity must be at least 1'),
    year: zod_1.z.number().optional(),
    schoolId: zod_1.z.string().min(1, 'School ID is required'),
});
exports.updateVehicleSchema = zod_1.z.object({
    licensePlate: zod_1.z.string().min(1, 'License plate is required').optional(),
    model: zod_1.z.string().min(1, 'Vehicle model is required').optional(),
    capacity: zod_1.z.number().min(1, 'Capacity must be at least 1').optional(),
    year: zod_1.z.number().optional(),
    schoolId: zod_1.z.string().min(1, 'School ID is required').optional(),
    isActive: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=vehicle.js.map