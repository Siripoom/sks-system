import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateTokens = (payload: { 
  id: string; 
  email: string; 
  role: Role;
}) => {
  const jwtSecret = process.env['JWT_SECRET'];
  const jwtRefreshSecret = process.env['JWT_REFRESH_SECRET'];
  
  if (!jwtSecret || !jwtRefreshSecret) {
    throw new Error('JWT secrets are not configured');
  }

  const accessToken = jwt.sign(payload, jwtSecret, {
    expiresIn: process.env['JWT_EXPIRES_IN'] || '24h',
  });

  const refreshToken = jwt.sign(payload, jwtRefreshSecret, {
    expiresIn: process.env['JWT_REFRESH_EXPIRES_IN'] || '7d',
  });

  return { accessToken, refreshToken };
};

export const verifyRefreshToken = (token: string) => {
  const jwtRefreshSecret = process.env['JWT_REFRESH_SECRET'];
  
  if (!jwtRefreshSecret) {
    throw new Error('JWT_REFRESH_SECRET is not configured');
  }

  return jwt.verify(token, jwtRefreshSecret) as {
    id: string;
    email: string;
    role: Role;
  };
};