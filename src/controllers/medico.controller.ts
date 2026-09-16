import { Request, Response } from 'express';
import { MedicoService } from '../services/medico.service.js';

export class MedicoController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    let status = 200;
    try {
      const especialidad = req.query.especialidad as string;
      const disponible = req.query.disponible !== undefined ? req.query.disponible === 'true' : undefined;
      const medicos = await MedicoService.getAll({ especialidad, disponible });
      return res.status(status).json(medicos);
    } catch (error: any) {
      status = status === 200 ? 500 : status;
      return res.status(status).json({ status, message: error.message });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    let status = 200;
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        status = 400;
        throw new Error('El ID proporcionado debe ser un número válido.');
      }
      const medico = await MedicoService.getById(id);
      if (!medico) {
        status = 404;
        throw new Error('Médico no encontrado en el sistema.');
      }
      return res.status(status).json(medico);
    } catch (error: any) {
      status = status === 200 ? 500 : status;
      return res.status(status).json({ status, message: error.message });
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    let status = 201;
    try {
      const nuevo = await MedicoService.create(req.body);
      return res.status(status).json(nuevo);
    } catch (error: any) {
      status = status === 201 ? 500 : status;
      return res.status(status).json({ status, message: error.message });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    let status = 200;
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        status = 400;
        throw new Error('El ID proporcionado debe ser un número válido.');
      }
      const actualizado = await MedicoService.update(id, req.body);
      if (!actualizado) {
        status = 404;
        throw new Error('Médico no encontrado para actualizar.');
      }
      return res.status(status).json(actualizado);
    } catch (error: any) {
      status = status === 200 ? 500 : status;
      return res.status(status).json({ status, message: error.message });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    let status = 200;
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        status = 400;
        throw new Error('El ID proporcionado debe ser un número válido.');
      }
      const borrado = await MedicoService.delete(id);
      if (!borrado) {
        status = 404;
        throw new Error('Médico no encontrado para eliminar.');
      }
      return res.status(status).json({ status: 200, message: 'Médico eliminado exitosamente.' });
    } catch (error: any) {
      status = status === 200 ? 500 : status;
      return res.status(status).json({ status, message: error.message });
    }
  }
}