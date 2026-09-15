import { Request, Response } from 'express';
import { TurnoService } from '../services/turno.service.js';

const turnoService = new TurnoService();

export class TurnoController {
  public static getAll = (req: Request, res: Response) => {
    try {
      const turnos = turnoService.getAll();
      res.status(200).json(turnos);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  public static getById = (req: Request, res: Response) => {
    const idParam = String(req.params.id);
    const id = parseInt(idParam, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const turno = turnoService.getById(id);
    if (!turno) return res.status(404).json({ error: 'Turno no encontrado' });

    res.status(200).json(turno);
  };

  public static create = (req: Request, res: Response) => {
    const { paciente, documento, especialidad, fecha, hora, confirmado } = req.body;
    if (!paciente || !documento || !especialidad || !fecha || !hora) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevoTurno = turnoService.create({ paciente, documento, especialidad, fecha, hora, confirmado: Boolean(confirmado) });
    res.status(201).json(nuevoTurno);
  };

  public static update = (req: Request, res: Response) => {
    const idParam = String(req.params.id);
    const id = parseInt(idParam, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const turnoActualizado = turnoService.update(id, req.body);
    if (!turnoActualizado) return res.status(404).json({ error: 'Turno no encontrado' });

    res.status(200).json(turnoActualizado);
  };

  public static delete = (req: Request, res: Response) => {
    const idParam = String(req.params.id);
    const id = parseInt(idParam, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const eliminado = turnoService.delete(id);
    if (!eliminado) return res.status(404).json({ error: 'Turno no encontrado' });

    res.status(200).json({ mensaje: 'Turno eliminado correctamente' });
  };
}