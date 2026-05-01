import { Request, Response } from 'express';
import { EmailService } from '../services/EmailService';
import { asyncHandler } from '../middleware/errorHandler';
import logger from '../config/logger';

export class EmailController {
  /**
   * Send onboarding emails when organization is created.
   * POST /api/v1/email/organization-created
   */
  static sendOrganizationCreatedEmail = asyncHandler(async (req: Request, res: Response) => {
    const {
      organizationName,
      companyAdminEmail,
      companyAdminInviteLink,
      inviteExpiresAt,
      companyAdminName,
      createdByName,
      createdByEmail,
      platformName,
      supportEmail,
    } = req.body;

    if (!organizationName || !companyAdminEmail || !companyAdminInviteLink || !inviteExpiresAt) {
      return res.status(400).json({
        success: false,
        error: 'organizationName, companyAdminEmail, companyAdminInviteLink, and inviteExpiresAt are required'
      });
    }

    const inviteExpiryDate = new Date(inviteExpiresAt);
    if (Number.isNaN(inviteExpiryDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: 'inviteExpiresAt must be a valid date'
      });
    }

    res.json({
      success: true,
      message: 'Organization onboarding emails queued for sending'
    });

    EmailService.sendOrganizationCreatedEmails({
      organizationName,
      companyAdminEmail,
      companyAdminInviteLink,
      inviteExpiresAt: inviteExpiryDate,
      companyAdminName,
      createdByName,
      createdByEmail,
      platformName,
      supportEmail,
    }).catch((error: any) => {
      logger.error('Background organization-created email flow failed', {
        organizationName,
        companyAdminEmail,
        error: error.message
      });
    });

    return;
  });

  /**
   * Send role invitation email for TrizenHR onboarding flow.
   * POST /api/v1/email/role-invitation
   */
  static sendRoleInvitationEmail = asyncHandler(async (req: Request, res: Response) => {
    const {
      email,
      role,
      inviteLink,
      expiresAt,
      organizationName,
      inviterName,
      platformName,
      name,
      supportEmail,
    } = req.body;

    if (!email || !role || !inviteLink || !expiresAt) {
      return res.status(400).json({
        success: false,
        error: 'email, role, inviteLink, and expiresAt are required'
      });
    }

    const invitationExpiryDate = new Date(expiresAt);
    if (Number.isNaN(invitationExpiryDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: 'expiresAt must be a valid date'
      });
    }

    res.json({
      success: true,
      message: 'Role invitation email queued for sending'
    });

    EmailService.sendTrizenRoleInvitationEmail({
      email,
      role,
      inviteLink,
      expiresAt: invitationExpiryDate,
      organizationName,
      inviterName,
      platformName,
      name,
      supportEmail,
    }).catch((error: any) => {
      logger.error('Background role invitation email send failed', {
        email,
        role,
        error: error.message
      });
    });

    return;
  });

  /**
   * Send password reset email
   * POST /api/v1/email/password-reset
   */
  static sendPasswordResetEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email, resetLink, name, expiresAt, platformName } = req.body;
    
    if (!email || !resetLink) {
      return res.status(400).json({
        success: false,
        error: 'email and resetLink are required'
      });
    }
    
    // Log the received platformName for debugging
    logger.info('Password reset email request received', {
      email,
      platformName: platformName || 'not provided (will use default)',
    });
    
    // Return immediately - process email in background
    res.json({
      success: true,
      message: 'Email queued for sending'
    });
    
    // Process email asynchronously (don't await)
    EmailService.sendPasswordResetEmail(
      email,
      resetLink,
      name,
      expiresAt ? new Date(expiresAt) : undefined,
      platformName
    ).catch((error: any) => {
      logger.error('Background password reset email send failed', {
        email,
        platformName,
        error: error.message
      });
    });
    
    return;
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
        service: 'trizenhr-email-service',
        provider: env.EMAIL_PROVIDER,
        from: env.EMAIL_FROM_ADDRESS,
        timestamp: new Date().toISOString(),
      }
    });
  });
}
