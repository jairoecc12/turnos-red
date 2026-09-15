import fs from 'node:fs/promises';
import path from 'node:path';
import { Turno, TurnoCrudo } from '../models/turno.model.js';
import { appEventEmitter } from './eventEmitter.js';

/*
  JUSTIFICACIÓN PROMESAS VS CALLBACKS (Requisito de la consigna):
  Uso de async/await y Promesas (node:fs/promises):
  - Evita el "Callback Hell" facilitando la lectura secuencial del código.
  - El manejo de errores con try...catch centraliza las excepciones limpiamente.
  
  Ejemplo con Callback tradicional (node:fs):
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) handleErr(err);
    // Procesamiento...
  });
*/

export class TurnoService {
  private turnos: Turno[] = [];

  constructor() {
    this.cargarYNormalizarDatos();
  }

  private async cargarYNormalizarDatos(): Promise<void> {
    try {
      const dataPath = process.env.DATA_PATH || './src/data/turnos.json';
      const data = await fs.readFile(path.resolve(dataPath), 'utf-8');
      const turnosCrudos: TurnoCrudo[] = JSON.parse(data);

      let aceptados = 0;
      let rechazados = 0;

      this.turnos = turnosCrudos
        .map((crudo) => this.normalizarTurno(crudo))
        .filter((turno): turno is Turno => {
          if (turno !== null) {
            aceptados++;
            return true;
          }
          rechazados++;
          return false;
        });

      console.log(`[Normalización] Registros aceptados: ${aceptados}, rechazados: ${rechazados}`);
    } catch (error) {
      console.error('Error al leer el archivo de turnos:', error);
      this.turnos = [];
    }
  }

  private normalizarTurno(crudo: TurnoCrudo): Turno | null {
    const idNum = Number(crudo.id);

    if (isNaN(idNum) || idNum <= 0 || !Number.isInteger(idNum)) {
      return null;
    }

    const pacienteSanitizado = String(crudo.paciente || '').trim();
    if (!pacienteSanitizado) return null;

    const confirmadoBool =
      typeof crudo.confirmado === 'boolean'
        ? crudo.confirmado
        : String(crudo.confirmado).trim().toLowerCase() === 'si' ||
          String(crudo.confirmado).trim().toLowerCase() === 'true';

    return {
      id: idNum,
      paciente: pacienteSanitizado,
      documento: String(crudo.documento).trim(),
      especialidad: String(crudo.especialidad).trim().toUpperCase(),
      fecha: String(crudo.fecha).trim(),
      hora: String(crudo.hora).trim().replace('.', ':'),
      confirmado: confirmadoBool,
    };
  }

  public getAll(): Turno[] {
    return this.turnos;
  }

  public getById(id: number): Turno | undefined {
    return this.turnos.find((t) => t.id === id);
  }

  public create(nuevoTurno: Omit<Turno, 'id'>): Turno {
    const nextId = this.turnos.length > 0 ? Math.max(...this.turnos.map((t) => t.id)) + 1 : 1;
    const turnoGuardado: Turno = { id: nextId, ...nuevoTurno };
    this.turnos.push(turnoGuardado);

    appEventEmitter.emit('turno:creado', turnoGuardado);
    return turnoGuardado;
  }

  public update(id: number, datosActualizados: Partial<Turno>): Turno | null {
    const index = this.turnos.findIndex((t) => t.id === id);
    if (index === -1) return null;

    this.turnos[index] = { ...this.turnos[index], ...datosActualizados, id };
    
    appEventEmitter.emit('turno:actualizado', this.turnos[index]);
    return this.turnos[index];
  }

  public delete(id: number): boolean {
    const index = this.turnos.findIndex((t) => t.id === id);
    if (index === -1) return false;

    const turnoEliminado = this.turnos.splice(index, 1)[0];
    
    appEventEmitter.emit('turno:eliminado', turnoEliminado);
    return true;
  }
}