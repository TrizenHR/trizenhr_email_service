import logger from '../config/logger';
import { validateEnv } from '../config/env';
import { SMTPProvider } from './providers/SMTPProvider';
import { SendGridProvider } from './providers/SendGridProvider';
import { SESProvider } from './providers/SESProvider';
import EmailLog from '../models/EmailLog';
import { TemplateService } from './TemplateService';
import { EmailOptions, EmailResult } from '../types';
import { fetchLogoAsBuffer } from '../utils/logoUtils';

export class EmailService {
  private static provider: any;

  /** Always read env fresh so new CapRover vars are picked up after restart. */
  private static getEnv() {
    return validateEnv();
  }

  private static getProvider() {
    if (!this.provider) {
      const env = this.getEnv();
      switch (env.EMAIL_PROVIDER) {
        case 'sendgrid':
          this.provider = new SendGridProvider();
          break;
        case 'ses':
          this.provider = new SESProvider();
          break;
        case 'smtp':
        default:
          this.provider = new SMTPProvider();
          break;
      }
    }
    return this.provider;
  }

  static async sendEmail(options: EmailOptions): Promise<EmailResult> {
    // Read env fresh on every call — ensures CapRover env updates are picked up
    const env = this.getEnv();
    try {
      let html = options.html;
      let text = options.text;
      let subject = options.subject;

      // Render template if provided
      if (options.template) {
        const templatesModule = require('../templates');
        const template = templatesModule.getTemplate(options.template);
        const data = options.data || {};

        logger.info('Rendering email template', {
          template: options.template,
          platformName: data.platformName,
        });

        if (template && typeof template.subject === 'function') {
          subject = template.subject(data);
        } else if (template && typeof template.subject === 'string') {
          if (!subject || subject.trim() === '') {
            subject = template.subject;
          }
        }

        const rendered = TemplateService.render(options.template, data);
        html = rendered.html;
        text = rendered.text;

        const needsCidLogo = typeof html === 'string' && html.includes('cid:logo');
        const hasCidLogo = Array.isArray(options.attachments)
          && options.attachments.some((attachment: any) => attachment?.cid === 'logo');

        if (needsCidLogo && !hasCidLogo) {
          try {
            const logoUrl = env.LOGO_URL || 'https://i.ibb.co/Zt9jNcs/logo.png';
            const logoBuffer = await fetchLogoAsBuffer(logoUrl);
            if (logoBuffer) {
              const logoAttachment = {
                filename: 'logo.png',
                content: logoBuffer,
                contentType: 'image/png',
                cid: 'logo',
              };
              options.attachments = Array.isArray(options.attachments)
                ? [...options.attachments, logoAttachment]
                : [logoAttachment];
            }
          } catch (error: any) {
            logger.warn('Failed to attach logo', { error: error.message });
          }
        }
      }

      if (!html && !text) {
        throw new Error('Either html, text, or template must be provided');
      }

      // ── Sender routing ────────────────────────────────────────────────────
      // HR / Manager / Employee invitations  → support@trizenventures.com
      // Company Admin invitation + everything else → support@trizenhr.com
      const isOrgRoleInvite =
        options.metadata?.type === 'trizen_role_invite' &&
        options.metadata?.role !== 'company_admin';

      const fromAddress = isOrgRoleInvite && env.EMAIL_FROM_ADDRESS_ORG
        ? env.EMAIL_FROM_ADDRESS_ORG
        : env.EMAIL_FROM_ADDRESS;

      const fromName = isOrgRoleInvite && env.EMAIL_FROM_NAME_ORG
        ? env.EMAIL_FROM_NAME_ORG
        : env.EMAIL_FROM_NAME;

      logger.info('Sender routing decision', {
        type: options.metadata?.type,
        role: options.metadata?.role,
        isOrgRoleInvite,
        fromAddress,
      });

      const provider = this.getProvider();

      const result = await provider.send({
        to: options.to,
        from: { email: fromAddress, name: fromName },
        replyTo: env.EMAIL_REPLY_TO,
        subject: subject || 'Notification',
        html: html || '',
        text: text || TemplateService.stripHtml(html || ''),
        cc: options.cc,
        bcc: options.bcc,
        attachments: options.attachments,
      });

      this.logEmail({
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: subject,
        template: options.template,
        status: 'sent',
        messageId: result.messageId,
        provider: env.EMAIL_PROVIDER,
        metadata: options.metadata,
      });

      return { success: true, messageId: result.messageId };
    } catch (error: any) {
      logger.error('Email send failed', {
        to: options.to,
        subject: options.subject,
        template: options.template,
        error: error.message,
      });

      this.logEmail({
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject || 'Failed Email',
        template: options.template,
        status: 'failed',
        error: error.message,
        provider: env.EMAIL_PROVIDER,
        metadata: options.metadata,
      });

      return { success: false, error: error.message };
    }
  }

  private static logEmail(data: any) {
    EmailLog.create({
      ...data,
      sentAt: new Date(),
    }).catch((error: any) => {
      logger.error('Failed to log email', { error: error.message });
    });
  }

  private static normalizeRole(role: string): string {
    return (role || '').trim().toLowerCase().replace(/\s+/g, '_');
  }

  private static getRoleLabel(role: string): string {
    const normalizedRole = this.normalizeRole(role);
    const labels: Record<string, string> = {
      company_admin: 'Company Admin',
      hr_admin: 'HR Admin',
      manager: 'Manager',
      employee: 'Employee',
      super_admin: 'System Admin',
    };

    return labels[normalizedRole] || role;
  }

  static async sendOrganizationCreatedEmails(params: {
    organizationName: string;
    companyAdminEmail: string;
    companyAdminInviteLink: string;
    inviteExpiresAt: Date;
    companyAdminName?: string;
    createdByName?: string;
    createdByEmail?: string;
    platformName?: string;
    supportEmail?: string;
  }) {
    const env = this.getEnv();
    const supportEmail = params.supportEmail || env.TRIZEN_SUPPORT_EMAIL || 'support@trizenventures.com';
    const platformName = params.platformName || 'TrizenHR';

    const supportNotificationResult = await this.sendEmail({
      to: supportEmail,
      subject: `${platformName} Organization Created: ${params.organizationName}`,
      template: 'organization_created_support',
      data: {
        organizationName: params.organizationName,
        companyAdminEmail: params.companyAdminEmail,
        companyAdminName: params.companyAdminName,
        createdByName: params.createdByName,
        createdByEmail: params.createdByEmail,
        createdAt: new Date(),
        platformName,
      },
      metadata: {
        type: 'organization_created_support',
        organizationName: params.organizationName,
      },
    });

    const companyAdminInviteResult = await this.sendTrizenRoleInvitationEmail({
      email: params.companyAdminEmail,
      role: 'company_admin',
      inviteLink: params.companyAdminInviteLink,
      expiresAt: params.inviteExpiresAt,
      organizationName: params.organizationName,
      inviterName: params.createdByName || 'System Admin',
      platformName,
      name: params.companyAdminName,
      supportEmail,
    });

    return {
      supportNotificationResult,
      companyAdminInviteResult,
    };
  }

  static async sendTrizenRoleInvitationEmail(params: {
    email: string;
    role: string;
    inviteLink: string;
    expiresAt: Date;
    organizationName?: string;
    inviterName?: string;
    platformName?: string;
    name?: string;
    supportEmail?: string;
  }) {
    const env = this.getEnv();
    const normalizedRole = this.normalizeRole(params.role);
    const supportEmail = params.supportEmail || env.TRIZEN_SUPPORT_EMAIL || 'support@trizenventures.com';
    const platformName = params.platformName || 'TrizenHR';
    const roleLabel = this.getRoleLabel(normalizedRole);

    const bcc = normalizedRole === 'company_admin' ? supportEmail : undefined;

    return this.sendEmail({
      to: params.email,
      bcc,
      subject: `${platformName} Invitation - ${roleLabel}`,
      template: 'trizen_role_invite',
      data: {
        role: normalizedRole,
        inviteLink: params.inviteLink,
        expiresAt: params.expiresAt,
        platformName,
        organizationName: params.organizationName,
        name: params.name,
        inviterName: params.inviterName,
      },
      metadata: {
        type: 'trizen_role_invite',
        role: normalizedRole,
        organizationName: params.organizationName,
      },
    });
  }

  static async sendPasswordResetEmail(
    email: string,
    resetLink: string,
    name?: string,
    expiresAt?: Date,
    platformName?: string
  ) {
    const formattedExpiresAt = expiresAt
      ? expiresAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
      : undefined;

    const finalPlatformName = platformName || "TrizenHR";

    return this.sendEmail({
      to: email,
      subject: '', // Empty - will be generated from template
      template: 'password_reset',
      data: {
        name: name || email.split('@')[0],
        resetLink,
        expiresAt: formattedExpiresAt,
        platformName: finalPlatformName,
      },
      metadata: { type: 'password_reset' },
    });
  }

  static async sendOtpEmail(
    email: string,
    otp: string,
    name?: string,
    expiresInMinutes?: number,
    platformName?: string
  ) {
    const finalPlatformName = platformName || 'TrizenHR';
    const recipientName = name || email.split('@')[0];
    const expiry = expiresInMinutes || 10;

    // Build a clean inline HTML email
    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
        <tr><td style="background:#4f46e5;padding:28px 40px;">
          <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">${finalPlatformName}</h1>
        </td></tr>
        <tr><td style="padding:36px 40px;">
          <p style="margin:0 0 8px;font-size:15px;color:#374151;">Hi ${recipientName},</p>
          <p style="margin:0 0 28px;font-size:15px;color:#6b7280;">Use the verification code below to complete your ${finalPlatformName} registration. It expires in <strong>${expiry} minutes</strong>.</p>
          <div style="text-align:center;margin:0 0 28px;">
            <div style="display:inline-block;background:#f3f4f6;border-radius:10px;padding:18px 40px;">
              <span style="font-size:38px;font-weight:900;letter-spacing:12px;color:#4f46e5;font-family:monospace;">${otp}</span>
            </div>
          </div>
          <p style="margin:0 0 8px;font-size:13px;color:#9ca3af;text-align:center;">This code is valid for ${expiry} minutes. Do not share it with anyone.</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0;">
          <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">If you didn't request this, you can safely ignore this email.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const text = `Your ${finalPlatformName} verification code is: ${otp}\n\nThis code expires in ${expiry} minutes. Do not share it with anyone.`;

    return this.sendEmail({
      to: email,
      subject: `${otp} is your ${finalPlatformName} verification code`,
      html,
      text,
      metadata: { type: 'otp_verification' },
    });
  }
}
