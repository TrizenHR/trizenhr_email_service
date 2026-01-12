import { Router } from 'express';
import { serviceAuthMiddleware } from '../middleware/serviceAuth';
import { EmailController } from '../controllers/EmailController';

const router = Router();

// All routes require service authentication
router.use(serviceAuthMiddleware);

// Email routes
router.post('/send', EmailController.sendEmail);
router.post('/admin-invite', EmailController.sendAdminInviteEmail);
router.post('/account-created', EmailController.sendAccountCreatedEmail);
router.post('/password-reset', EmailController.sendPasswordResetEmail);
router.get('/health', EmailController.healthCheck);

export default router;
