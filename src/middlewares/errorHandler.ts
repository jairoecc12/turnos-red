import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 400,
      message: 'Error de validación en los datos ingresados',
      code: 'VALIDATION_ERROR',
      details: err.issues.map((e: any) => ({
        field: e.path.join('.'),
        message: e.message
      }))
    });
  }

  const status = err.status || 500;
  return res.status(status).json({
    status,
    message: err.message || 'Error interno del servidor',
    code: err.code || 'INTERNAL_SERVER_ERROR',
    details: err.details || []
  });
};