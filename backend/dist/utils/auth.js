"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateTokens = exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hashPassword = async (password) => {
    return bcryptjs_1.default.hash(password, 12);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hashedPassword) => {
    return bcryptjs_1.default.compare(password, hashedPassword);
};
exports.comparePassword = comparePassword;
const generateTokens = (payload) => {
    const jwtSecret = process.env['JWT_SECRET'];
    const jwtRefreshSecret = process.env['JWT_REFRESH_SECRET'];
    if (!jwtSecret || !jwtRefreshSecret) {
        throw new Error('JWT secrets are not configured');
    }
    const accessToken = jsonwebtoken_1.default.sign(payload, jwtSecret, {
        expiresIn: process.env['JWT_EXPIRES_IN'] || '24h',
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, jwtRefreshSecret, {
        expiresIn: process.env['JWT_REFRESH_EXPIRES_IN'] || '7d',
    });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
const verifyRefreshToken = (token) => {
    const jwtRefreshSecret = process.env['JWT_REFRESH_SECRET'];
    if (!jwtRefreshSecret) {
        throw new Error('JWT_REFRESH_SECRET is not configured');
    }
    return jsonwebtoken_1.default.verify(token, jwtRefreshSecret);
};
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=auth.js.map