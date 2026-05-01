import { Router } from 'express';
import { serviceAuthMiddleware } from '../middleware/serviceAuth';
import { EmailController } from '../controllers/EmailController';

const router = Router();

// All routes require service authentication
router.use(serviceAuthMiddleware);

// TrizenHR email routes
router.post('/organization-created', EmailController.sendOrganizationCreatedEmail);
router.post('/role-invitation', EmailController.sendRoleInvitationEmail);
router.post('/password-reset', EmailController.sendPasswordResetEmail);
router.get('/health', EmailController.healthCheck);

export default router;
