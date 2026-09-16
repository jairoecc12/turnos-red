import { z } from 'zod';

export const turnoSchema = z.object({
  paciente: z.string().min(2, 'El nombre del paciente es obligatorio'),
  documento: z.string().min(7, 'El documento debe tener al menos 7 caracteres'),
  especialidad: z.string().min(2, 'La especialidad es obligatoria'),
  fecha: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato de fecha inválido (DD/MM/YYYY)'),
  hora: z.string().regex(/^\d{2}:\d{2}$/, 'Formato de hora inválido (HH:MM)'),
  confirmado: z.boolean().optional().default(false),
  medicoId: z.number().optional()
});

export const turnoUpdateSchema = turnoSchema.partial();