import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', (_, res) => {
  res.json({ success: true, data: { trips: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } } });
});

router.get('/:id', (_, res) => {
  res.json({ success: true, data: { trip: null } });
});

router.post('/', authorize('ADMIN', 'TEACHER'), (_, res) => {
  res.json({ success: true, data: { trip: null } });
});

router.put('/:id', authorize('ADMIN', 'TEACHER', 'DRIVER'), (_, res) => {
  res.json({ success: true, data: { trip: null } });
});

router.delete('/:id', authorize('ADMIN'), (_, res) => {
  res.json({ success: true, message: 'Trip deleted successfully' });
});

export default router;