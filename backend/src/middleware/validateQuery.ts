import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from './errorHandler';

export const validateQuery = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.query);
      
      if (!result.success) {
        const error: AppError = new Error('Query validation failed');
        error.statusCode = 400;
        (error as any).details = result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        throw error;
      }
      
      req.query = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
};