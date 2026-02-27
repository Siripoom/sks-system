import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', authorize('ADMIN', 'TEACHER'), (_, res) => {
  res.json({ success: true, data: { guardians: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } } });
});

router.get('/:id', (_, res) => {
  res.json({ success: true, data: { guardian: null } });
});

router.post('/', authorize('ADMIN', 'TEACHER'), (_, res) => {
  res.json({ success: true, data: { guardian: null } });
});

router.put('/:id', authorize('ADMIN', 'TEACHER'), (_, res) => {
  res.json({ success: true, data: { guardian: null } });
});

router.delete('/:id', authorize('ADMIN'), (_, res) => {
  res.json({ success: true, message: 'Guardian deleted successfully' });
});

export default router;