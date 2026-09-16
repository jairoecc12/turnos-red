import { Router } from 'express';
import { MedicoController } from '../controllers/medico.controller.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { medicoSchema, medicoUpdateSchema } from '../schemas/medico.schema.js';

const router = Router();

router.get('/', MedicoController.getAll);
router.get('/:id', MedicoController.getById);
router.post('/', validateSchema(medicoSchema), MedicoController.create);
router.put('/:id', validateSchema(medicoUpdateSchema), MedicoController.update);
router.delete('/:id', MedicoController.delete);

export default router;