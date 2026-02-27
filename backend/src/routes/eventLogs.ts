import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', authorize('ADMIN'), (_, res) => {
  res.json({ success: true, data: { events: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } } });
});

router.get('/:id', authorize('ADMIN'), (_, res) => {
  res.json({ success: true, data: { event: null } });
});

export default router;