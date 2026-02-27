import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from './errorHandler';

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      
      if (!result.success) {
        const error: AppError = new Error('Validation failed');
        error.statusCode = 400;
        (error as any).details = result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        throw error;
      }
      
      req.body = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
};