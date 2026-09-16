import { Request, Response, NextFunction } from 'express';
import { MedicoService } from '../services/medico.service.js';

export class MedicoController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const especialidad = req.query.especialidad as string;
      const disponible = req.query.disponible !== undefined ? req.query.disponible === 'true' : undefined;
      const medicos = await MedicoService.getAll({ especialidad, disponible });
      res.status(200).json(medicos);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const medico = await MedicoService.getById(id);
      if (!medico) return res.status(404).json({ status: 404, message: 'Médico no encontrado', code: 'NOT_FOUND' });
      res.status(200).json(medico);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const nuevo = await MedicoService.create(req.body);
      res.status(201).json(nuevo);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const actualizado = await MedicoService.update(id, req.body);
      if (!actualizado) return res.status(404).json({ status: 404, message: 'Médico no encontrado', code: 'NOT_FOUND' });
      res.status(200).json(actualizado);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const ok = await MedicoService.delete(id);
      if (!ok) return res.status(404).json({ status: 404, message: 'Médico no encontrado', code: 'NOT_FOUND' });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}