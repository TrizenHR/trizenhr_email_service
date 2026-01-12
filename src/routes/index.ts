import { Router } from 'express';
import emailRoutes from './email';

const router = Router();

// Health check (no auth required)
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    service: 'extrahand-email-service',
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// Email routes
router.use('/email', emailRoutes);

export default router;
