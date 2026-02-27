"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentSchema = exports.createStudentSchema = void 0;
const zod_1 = require("zod");
exports.createStudentSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'First name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
    grade: zod_1.z.string().min(1, 'Grade is required'),
    schoolId: zod_1.z.string().min(1, 'School ID is required'),
    guardianId: zod_1.z.string().min(1, 'Guardian ID is required'),
});
exports.updateStudentSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'First name is required').optional(),
    lastName: zod_1.z.string().min(1, 'Last name is required').optional(),
    grade: zod_1.z.string().min(1, 'Grade is required').optional(),
    schoolId: zod_1.z.string().min(1, 'School ID is required').optional(),
    guardianId: zod_1.z.string().min(1, 'Guardian ID is required').optional(),
    isActive: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=student.js.map