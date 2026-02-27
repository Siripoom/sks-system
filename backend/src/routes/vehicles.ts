import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createVehicleSchema, updateVehicleSchema } from '../schemas/vehicle';
import * as vehicleController from '../controllers/vehicleController';

const router = Router();

router.use(authenticate);

router.post('/', authorize('ADMIN'), validate(createVehicleSchema), vehicleController.createVehicle);
router.get('/', vehicleController.getVehicles);
router.get('/:id', vehicleController.getVehicleById);
router.put('/:id', authorize('ADMIN'), validate(updateVehicleSchema), vehicleController.updateVehicle);
router.delete('/:id', authorize('ADMIN'), vehicleController.deleteVehicle);

export default router;