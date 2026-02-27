"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicle = exports.updateVehicle = exports.getVehicleById = exports.getVehicles = exports.createVehicle = void 0;
const index_1 = require("../index");
const createVehicle = async (req, res) => {
    const { licensePlate, model, capacity, year, schoolId } = req.body;
    const school = await index_1.prisma.school.findUnique({
        where: { id: schoolId },
    });
    if (!school) {
        const error = new Error('School not found');
        error.statusCode = 404;
        throw error;
    }
    const vehicle = await index_1.prisma.vehicle.create({
        data: {
            licensePlate,
            model,
            capacity,
            year,
            schoolId,
        },
        include: {
            school: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    res.status(201).json({
        success: true,
        data: { vehicle },
    });
};
exports.createVehicle = createVehicle;
const getVehicles = async (req, res) => {
    const { page = 1, limit = 10, schoolId, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    const where = { isActive: true };
    if (schoolId && typeof schoolId === 'string') {
        where.schoolId = schoolId;
    }
    if (search && typeof search === 'string') {
        where.OR = [
            { licensePlate: { contains: search, mode: 'insensitive' } },
            { model: { contains: search, mode: 'insensitive' } },
        ];
    }
    const [vehicles, total] = await Promise.all([
        index_1.prisma.vehicle.findMany({
            where,
            skip,
            take,
            include: {
                school: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                _count: {
                    select: {
                        assignments: true,
                        trips: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        }),
        index_1.prisma.vehicle.count({ where }),
    ]);
    res.json({
        success: true,
        data: {
            vehicles,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit)),
            },
        },
    });
};
exports.getVehicles = getVehicles;
const getVehicleById = async (req, res) => {
    const { id } = req.params;
    const vehicle = await index_1.prisma.vehicle.findUnique({
        where: { id },
        include: {
            school: {
                select: {
                    id: true,
                    name: true,
                    address: true,
                },
            },
            assignments: {
                where: { isActive: true },
                include: {
                    driver: {
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
                    student: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            grade: true,
                        },
                    },
                },
            },
            trips: {
                orderBy: {
                    createdAt: 'desc',
                },
                take: 5,
                include: {
                    driver: {
                        include: {
                            user: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                },
                            },
                        },
                    },
                    route: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });
    if (!vehicle) {
        const error = new Error('Vehicle not found');
        error.statusCode = 404;
        throw error;
    }
    res.json({
        success: true,
        data: { vehicle },
    });
};
exports.getVehicleById = getVehicleById;
const updateVehicle = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const existingVehicle = await index_1.prisma.vehicle.findUnique({
        where: { id },
    });
    if (!existingVehicle) {
        const error = new Error('Vehicle not found');
        error.statusCode = 404;
        throw error;
    }
    if (updateData.schoolId) {
        const school = await index_1.prisma.school.findUnique({
            where: { id: updateData.schoolId },
        });
        if (!school) {
            const error = new Error('School not found');
            error.statusCode = 404;
            throw error;
        }
    }
    const vehicle = await index_1.prisma.vehicle.update({
        where: { id },
        data: updateData,
        include: {
            school: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    res.json({
        success: true,
        data: { vehicle },
    });
};
exports.updateVehicle = updateVehicle;
const deleteVehicle = async (req, res) => {
    const { id } = req.params;
    const existingVehicle = await index_1.prisma.vehicle.findUnique({
        where: { id },
        include: {
            _count: {
                select: {
                    assignments: true,
                    trips: true,
                },
            },
        },
    });
    if (!existingVehicle) {
        const error = new Error('Vehicle not found');
        error.statusCode = 404;
        throw error;
    }
    const hasActiveData = existingVehicle._count.assignments > 0 ||
        existingVehicle._count.trips > 0;
    if (hasActiveData) {
        await index_1.prisma.vehicle.update({
            where: { id },
            data: { isActive: false },
        });
        res.json({
            success: true,
            message: 'Vehicle deactivated successfully (has associated data)',
        });
    }
    else {
        await index_1.prisma.vehicle.delete({
            where: { id },
        });
        res.json({
            success: true,
            message: 'Vehicle deleted successfully',
        });
    }
};
exports.deleteVehicle = deleteVehicle;
//# sourceMappingURL=vehicleController.js.map