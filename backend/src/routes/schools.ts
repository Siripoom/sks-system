import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createSchoolSchema, updateSchoolSchema } from '../schemas/school';
import * as schoolController from '../controllers/schoolController';

const router = Router();

router.use(authenticate);

router.post('/', authorize('ADMIN'), validate(createSchoolSchema), schoolController.createSchool);
router.get('/', schoolController.getSchools);
router.get('/:id', schoolController.getSchoolById);
router.put('/:id', authorize('ADMIN'), validate(updateSchoolSchema), schoolController.updateSchool);
router.delete('/:id', authorize('ADMIN'), schoolController.deleteSchool);

export default router;