"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDriverSchema = exports.createDriverSchema = void 0;
const zod_1 = require("zod");
exports.createDriverSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, 'User ID is required'),
    licenseNumber: zod_1.z.string().min(1, 'License number is required'),
    schoolId: zod_1.z.string().min(1, 'School ID is required'),
});
exports.updateDriverSchema = zod_1.z.object({
    licenseNumber: zod_1.z.string().min(1, 'License number is required').optional(),
    schoolId: zod_1.z.string().min(1, 'School ID is required').optional(),
    isActive: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=driver.js.map