"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.logout = exports.refreshToken = exports.login = exports.register = void 0;
const index_1 = require("../index");
const auth_1 = require("../utils/auth");
const client_1 = require("@prisma/client");
const register = async (req, res) => {
    const { email, password, firstName, lastName, phone, role } = req.body;
    const existingUser = await index_1.prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        const error = new Error('User already exists with this email');
        error.statusCode = 409;
        throw error;
    }
    const hashedPassword = await (0, auth_1.hashPassword)(password);
    const user = await index_1.prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone: phone || null,
            role,
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            role: true,
            createdAt: true,
        },
    });
    const { accessToken, refreshToken } = (0, auth_1.generateTokens)({
        id: user.id,
        email: user.email,
        role: user.role,
    });
    await index_1.prisma.eventLog.create({
        data: {
            type: client_1.EventType.USER_LOGIN,
            description: `User registered: ${user.email}`,
            userId: user.id,
            ipAddress: req.ip || null,
            userAgent: req.get('User-Agent') || null,
        },
    });
    res.status(201).json({
        success: true,
        data: {
            user,
            tokens: {
                accessToken,
                refreshToken,
            },
        },
    });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await index_1.prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
    }
    if (!user.isActive) {
        const error = new Error('Account is deactivated');
        error.statusCode = 401;
        throw error;
    }
    const isValidPassword = await (0, auth_1.comparePassword)(password, user.password);
    if (!isValidPassword) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
    }
    const { accessToken, refreshToken } = (0, auth_1.generateTokens)({
        id: user.id,
        email: user.email,
        role: user.role,
    });
    await index_1.prisma.eventLog.create({
        data: {
            type: client_1.EventType.USER_LOGIN,
            description: `User logged in: ${user.email}`,
            userId: user.id,
            ipAddress: req.ip || null,
            userAgent: req.get('User-Agent') || null,
        },
    });
    res.json({
        success: true,
        data: {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                role: user.role,
                createdAt: user.createdAt,
            },
            tokens: {
                accessToken,
                refreshToken,
            },
        },
    });
};
exports.login = login;
const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    const decoded = (0, auth_1.verifyRefreshToken)(refreshToken);
    const user = await index_1.prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
            id: true,
            email: true,
            role: true,
            isActive: true,
        },
    });
    if (!user || !user.isActive) {
        const error = new Error('Invalid refresh token');
        error.statusCode = 401;
        throw error;
    }
    const tokens = (0, auth_1.generateTokens)({
        id: user.id,
        email: user.email,
        role: user.role,
    });
    res.json({
        success: true,
        data: {
            tokens,
        },
    });
};
exports.refreshToken = refreshToken;
const logout = async (req, res) => {
    const authReq = req;
    if (authReq.user) {
        await index_1.prisma.eventLog.create({
            data: {
                type: client_1.EventType.USER_LOGOUT,
                description: `User logged out: ${authReq.user.email}`,
                userId: authReq.user.id,
                ipAddress: req.ip || null,
                userAgent: req.get('User-Agent') || null,
            },
        });
    }
    res.json({
        success: true,
        message: 'Logged out successfully',
    });
};
exports.logout = logout;
const me = async (req, res) => {
    const authReq = req;
    res.json({
        success: true,
        data: {
            user: authReq.user,
        },
    });
};
exports.me = me;
//# sourceMappingURL=authController.js.map