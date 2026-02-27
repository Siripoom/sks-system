"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchoolSchema = exports.createSchoolSchema = void 0;
const zod_1 = require("zod");
exports.createSchoolSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'School name is required'),
    address: zod_1.z.string().min(1, 'Address is required'),
    phone: zod_1.z.string().min(1, 'Phone number is required'),
    email: zod_1.z.string().email('Invalid email format').optional(),
});
exports.updateSchoolSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'School name is required').optional(),
    address: zod_1.z.string().min(1, 'Address is required').optional(),
    phone: zod_1.z.string().min(1, 'Phone number is required').optional(),
    email: zod_1.z.string().email('Invalid email format').optional(),
    isActive: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=school.js.map