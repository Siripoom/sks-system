"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const index_1 = require("../index");
const getUsers = async (req, res) => {
    const { page = 1, limit = 10, role, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    const where = {};
    if (role && typeof role === 'string') {
        where.role = role;
    }
    if (search && typeof search === 'string') {
        where.OR = [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
        ];
    }
    const [users, total] = await Promise.all([
        index_1.prisma.user.findMany({
            where,
            skip,
            take,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                role: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        }),
        index_1.prisma.user.count({ where }),
    ]);
    res.json({
        success: true,
        data: {
            users,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit)),
            },
        },
    });
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await index_1.prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    res.json({
        success: true,
        data: { user },
    });
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, phone, isActive } = req.body;
    if (req.user?.role !== 'ADMIN' && req.user?.id !== id) {
        const error = new Error('Insufficient permissions');
        error.statusCode = 403;
        throw error;
    }
    const existingUser = await index_1.prisma.user.findUnique({
        where: { id },
    });
    if (!existingUser) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    const updateData = {};
    if (firstName !== undefined)
        updateData.firstName = firstName;
    if (lastName !== undefined)
        updateData.lastName = lastName;
    if (phone !== undefined)
        updateData.phone = phone;
    if (req.user?.role === 'ADMIN' && isActive !== undefined) {
        updateData.isActive = isActive;
    }
    const user = await index_1.prisma.user.update({
        where: { id },
        data: updateData,
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    res.json({
        success: true,
        data: { user },
    });
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (req.user?.id === id) {
        const error = new Error('Cannot delete your own account');
        error.statusCode = 400;
        throw error;
    }
    const existingUser = await index_1.prisma.user.findUnique({
        where: { id },
    });
    if (!existingUser) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    await index_1.prisma.user.update({
        where: { id },
        data: { isActive: false },
    });
    res.json({
        success: true,
        message: 'User deactivated successfully',
    });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map