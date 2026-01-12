import { Request, Response } from 'express';
import { EmailService } from '../services/EmailService';
import { asyncHandler } from '../middleware/errorHandler';

export class EmailController {
  /**
   * Send generic email
   * POST /api/v1/email/send
   */
  static sendEmail = asyncHandler(async (req: Request, res: Response) => {
    const result = await EmailService.sendEmail(req.body);
    return res.json(result);
  });

  /**
   * Send admin invite email
   * POST /api/v1/email/admin-invite
   */
  static sendAdminInviteEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email, role, inviteLink, expiresAt, team, department } = req.body;
    
    if (!email || !role || !inviteLink || !expiresAt) {
      return res.status(400).json({
        success: false,
        error: 'email, role, inviteLink, and expiresAt are required'
      });
    }
    
    const result = await EmailService.sendAdminInviteEmail(
      email,
      role,
      inviteLink,
      new Date(expiresAt),
      team,
      department
    );
    return res.json(result);
  });

  /**
   * Send account created email
   * POST /api/v1/email/account-created
   */
  static sendAccountCreatedEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email, name, phone } = req.body;
    
    if (!email || !name) {
      return res.status(400).json({
        success: false,
        error: 'email and name are required'
      });
    }
    
    const result = await EmailService.sendAccountCreatedEmail(email, name, phone);
    return res.json(result);
  });

  /**
   * Send password reset email
   * POST /api/v1/email/password-reset
   */
  static sendPasswordResetEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email, resetLink, name, expiresAt } = req.body;
    
    if (!email || !resetLink) {
      return res.status(400).json({
        success: false,
        error: 'email and resetLink are required'
      });
    }
    
    const result = await EmailService.sendPasswordResetEmail(
      email,
      resetLink,
      name,
      expiresAt ? new Date(expiresAt) : undefined
    );
    return res.json(result);
  });

  /**
   * Health check with provider verification
   * GET /api/v1/email/health
   */
  static healthCheck = asyncHandler(async (_req: Request, res: Response) => {
    const { validateEnv } = await import('../config/env');
    const env = validateEnv();
    
    res.json({
      success: true,
      data: {
        status: 'healthy',
        service: 'extrahand-email-service',
        provider: env.EMAIL_PROVIDER,
        from: env.EMAIL_FROM_ADDRESS,
        timestamp: new Date().toISOString(),
      }
    });
  });
}
