import { Router } from 'express';
import { TurnoController } from '../controllers/turno.controller.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { turnoSchema, turnoUpdateSchema } from '../schemas/turno.schema.js';

const router = Router();

router.get('/', TurnoController.getAll);
router.get('/:id', TurnoController.getById);
router.post('/', validateSchema(turnoSchema), TurnoController.create);
router.put('/:id', validateSchema(turnoUpdateSchema), TurnoController.update);
router.delete('/:id', TurnoController.delete);

export default router;