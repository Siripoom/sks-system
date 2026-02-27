import { Request, Response } from 'express';
import { prisma } from '../index';
import { hashPassword, comparePassword, generateTokens, verifyRefreshToken } from '../utils/auth';
import { RegisterInput, LoginInput, RefreshTokenInput } from '../schemas/auth';
import { AppError } from '../middleware/errorHandler';
import { EventType } from '@prisma/client';

export const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, phone, role }: RegisterInput = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const error: AppError = new Error('User already exists with this email');
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
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

  const { accessToken, refreshToken } = generateTokens({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  await prisma.eventLog.create({
    data: {
      type: EventType.USER_LOGIN,
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

export const login = async (req: Request, res: Response) => {
  const { email, password }: LoginInput = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const error: AppError = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  if (!user.isActive) {
    const error: AppError = new Error('Account is deactivated');
    error.statusCode = 401;
    throw error;
  }

  const isValidPassword = await comparePassword(password, user.password);

  if (!isValidPassword) {
    const error: AppError = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  const { accessToken, refreshToken } = generateTokens({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  await prisma.eventLog.create({
    data: {
      type: EventType.USER_LOGIN,
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

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken }: RefreshTokenInput = req.body;

  const decoded = verifyRefreshToken(refreshToken);

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: {
      id: true,
      email: true,
      role: true,
      isActive: true,
    },
  });

  if (!user || !user.isActive) {
    const error: AppError = new Error('Invalid refresh token');
    error.statusCode = 401;
    throw error;
  }

  const tokens = generateTokens({
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

export const logout = async (req: Request, res: Response) => {
  const authReq = req as any;
  
  if (authReq.user) {
    await prisma.eventLog.create({
      data: {
        type: EventType.USER_LOGOUT,
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

export const me = async (req: Request, res: Response) => {
  const authReq = req as any;
  
  res.json({
    success: true,
    data: {
      user: authReq.user,
    },
  });
};