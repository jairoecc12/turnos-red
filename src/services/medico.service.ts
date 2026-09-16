import fs from 'node:fs/promises';
import path from 'node:path';
import { Medico } from '../models/medico.model.js';

const filePath = path.resolve('src/data/medicos.json');

async function getMedicosFromFile(): Promise<Medico[]> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveMedicosToFile(medicos: Medico[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(medicos, null, 2), 'utf-8');
}

export class MedicoService {
  static async getAll(filters?: { especialidad?: string; disponible?: boolean }): Promise<Medico[]> {
    let medicos = await getMedicosFromFile();
    if (filters?.especialidad) {
      medicos = medicos.filter(m => m.especialidad.toLowerCase() === filters.especialidad?.toLowerCase());
    }
    if (filters?.disponible !== undefined) {
      medicos = medicos.filter(m => m.disponible === filters.disponible);
    }
    return medicos;
  }

  static async getById(id: number): Promise<Medico | null> {
    const medicos = await getMedicosFromFile();
    return medicos.find(m => m.id === id) || null;
  }

  static async create(data: Omit<Medico, 'id'>): Promise<Medico> {
    const medicos = await getMedicosFromFile();
    const newMedico: Medico = { id: Date.now(), ...data };
    medicos.push(newMedico);
    await saveMedicosToFile(medicos);
    return newMedico;
  }

  static async update(id: number, data: Partial<Medico>): Promise<Medico | null> {
    const medicos = await getMedicosFromFile();
    const index = medicos.findIndex(m => m.id === id);
    if (index === -1) return null;
    medicos[index] = { ...medicos[index], ...data };
    await saveMedicosToFile(medicos);
    return medicos[index];
  }

  static async delete(id: number): Promise<boolean> {
    const medicos = await getMedicosFromFile();
    const filtered = medicos.filter(m => m.id !== id);
    if (filtered.length === medicos.length) return false;
    await saveMedicosToFile(filtered);
    return true;
  }
}