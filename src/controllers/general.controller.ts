import { Request, Response } from 'express';

export class GeneralController {
  static async getWelcome(req: Request, res: Response): Promise<Response> {
    let status = 200;
    try {
      return res.status(status).json({
        message: 'Bienvenido a la API RESTful de TurnosMed',
        version: '1.0.0',
        status: status
      });
    } catch (error: any) {
      status = 500;
      return res.status(status).json({
        status: status,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  static async handleNotFound(req: Request, res: Response): Promise<Response> {
    let status = 404;
    try {
      throw new Error(`La ruta solicitada '${req.originalUrl}' no existe en este servidor.`);
    } catch (error: any) {
      return res.status(status).json({
        status: status,
        message: 'Recurso no encontrado',
        error: error.message
      });
    }
  }
}