import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', (_, res) => {
  res.json({ success: true, data: { stops: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } } });
});

router.get('/:id', (_, res) => {
  res.json({ success: true, data: { stop: null } });
});

router.post('/', authorize('ADMIN', 'TEACHER'), (_, res) => {
  res.json({ success: true, data: { stop: null } });
});

router.put('/:id', authorize('ADMIN', 'TEACHER'), (_, res) => {
  res.json({ success: true, data: { stop: null } });
});

router.delete('/:id', authorize('ADMIN'), (_, res) => {
  res.json({ success: true, message: 'Stop deleted successfully' });
});

export default router;