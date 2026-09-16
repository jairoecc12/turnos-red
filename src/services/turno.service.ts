import fs from 'node:fs/promises';
import path from 'node:path';
import { Turno } from '../models/turno.model.js';

const filePath = path.resolve('src/data/turnos.json');

async function getTurnosFromFile(): Promise<Turno[]> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveTurnosToFile(turnos: Turno[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(turnos, null, 2), 'utf-8');
}

export class TurnoService {
  static async getAll(filters?: { especialidad?: string; fecha?: string; medicoId?: number }): Promise<Turno[]> {
    let turnos = await getTurnosFromFile();
    
    if (filters?.especialidad) {
      turnos = turnos.filter(t => t.especialidad.toLowerCase() === filters.especialidad?.toLowerCase());
    }
    if (filters?.fecha) {
      turnos = turnos.filter(t => t.fecha === filters.fecha);
    }
    if (filters?.medicoId !== undefined && !isNaN(filters.medicoId)) {
      turnos = turnos.filter(t => t.medicoId === filters.medicoId);
    }
    
    return turnos;
  }

  static async getById(id: number): Promise<Turno | null> {
    const turnos = await getTurnosFromFile();
    return turnos.find(t => t.id === id) || null;
  }

  static async create(data: Omit<Turno, 'id'>): Promise<Turno> {
    const turnos = await getTurnosFromFile();
    const newTurno: Turno = { id: Date.now(), ...data };
    turnos.push(newTurno);
    await saveTurnosToFile(turnos);
    return newTurno;
  }

  static async update(id: number, data: Partial<Turno>): Promise<Turno | null> {
    const turnos = await getTurnosFromFile();
    const index = turnos.findIndex(t => t.id === id);
    if (index === -1) return null;
    turnos[index] = { ...turnos[index], ...data };
    await saveTurnosToFile(turnos);
    return turnos[index];
  }

  static async delete(id: number): Promise<boolean> {
    const turnos = await getTurnosFromFile();
    const filtered = turnos.filter(t => t.id !== id);
    if (filtered.length === turnos.length) return false;
    await saveTurnosToFile(filtered);
    return true;
  }
}