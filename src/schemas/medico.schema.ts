import { z } from 'zod';

export const medicoSchema = z.object({
  nombre: z.string().min(2, 'El nombre es obligatorio'),
  especialidad: z.string().min(2, 'La especialidad es obligatoria'),
  disponible: z.boolean().default(true)
});

export const medicoUpdateSchema = medicoSchema.partial();