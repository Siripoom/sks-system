import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import * as userController from '../controllers/userController';

const router = Router();

router.use(authenticate);

router.get('/', authorize('ADMIN', 'TEACHER'), userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', authorize('ADMIN'), userController.deleteUser);

export default router;