"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSchool = exports.updateSchool = exports.getSchoolById = exports.getSchools = exports.createSchool = void 0;
const index_1 = require("../index");
const createSchool = async (req, res) => {
    const { name, address, phone, email } = req.body;
    const school = await index_1.prisma.school.create({
        data: {
            name,
            address,
            phone,
            email,
        },
    });
    res.status(201).json({
        success: true,
        data: { school },
    });
};
exports.createSchool = createSchool;
const getSchools = async (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    const where = { isActive: true };
    if (search && typeof search === 'string') {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { address: { contains: search, mode: 'insensitive' } },
        ];
    }
    const [schools, total] = await Promise.all([
        index_1.prisma.school.findMany({
            where,
            skip,
            take,
            include: {
                _count: {
                    select: {
                        vehicles: true,
                        drivers: true,
                        students: true,
                        routes: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        }),
        index_1.prisma.school.count({ where }),
    ]);
    res.json({
        success: true,
        data: {
            schools,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit)),
            },
        },
    });
};
exports.getSchools = getSchools;
const getSchoolById = async (req, res) => {
    const { id } = req.params;
    const school = await index_1.prisma.school.findUnique({
        where: { id },
        include: {
            vehicles: {
                where: { isActive: true },
                select: {
                    id: true,
                    licensePlate: true,
                    model: true,
                    capacity: true,
                    year: true,
                },
            },
            drivers: {
                where: { isActive: true },
                include: {
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true,
                        },
                    },
                },
            },
            students: {
                where: { isActive: true },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    grade: true,
                },
            },
            routes: {
                where: { isActive: true },
                select: {
                    id: true,
                    name: true,
                    description: true,
                },
            },
            _count: {
                select: {
                    vehicles: true,
                    drivers: true,
                    students: true,
                    routes: true,
                },
            },
        },
    });
    if (!school) {
        const error = new Error('School not found');
        error.statusCode = 404;
        throw error;
    }
    res.json({
        success: true,
        data: { school },
    });
};
exports.getSchoolById = getSchoolById;
const updateSchool = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const existingSchool = await index_1.prisma.school.findUnique({
        where: { id },
    });
    if (!existingSchool) {
        const error = new Error('School not found');
        error.statusCode = 404;
        throw error;
    }
    const school = await index_1.prisma.school.update({
        where: { id },
        data: updateData,
    });
    res.json({
        success: true,
        data: { school },
    });
};
exports.updateSchool = updateSchool;
const deleteSchool = async (req, res) => {
    const { id } = req.params;
    const existingSchool = await index_1.prisma.school.findUnique({
        where: { id },
        include: {
            _count: {
                select: {
                    vehicles: true,
                    drivers: true,
                    students: true,
                    routes: true,
                },
            },
        },
    });
    if (!existingSchool) {
        const error = new Error('School not found');
        error.statusCode = 404;
        throw error;
    }
    const hasActiveData = existingSchool._count.vehicles > 0 ||
        existingSchool._count.drivers > 0 ||
        existingSchool._count.students > 0 ||
        existingSchool._count.routes > 0;
    if (hasActiveData) {
        await index_1.prisma.school.update({
            where: { id },
            data: { isActive: false },
        });
        res.json({
            success: true,
            message: 'School deactivated successfully (has associated data)',
        });
    }
    else {
        await index_1.prisma.school.delete({
            where: { id },
        });
        res.json({
            success: true,
            message: 'School deleted successfully',
        });
    }
};
exports.deleteSchool = deleteSchool;
//# sourceMappingURL=schoolController.js.map