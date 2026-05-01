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
  private static env = validateEnv();

  private static getProvider() {
    if (!this.provider) {
      switch (this.env.EMAIL_PROVIDER) {
        case 'sendgrid':
          this.provider = new SendGridProvider();
          break;
        case 'ses':
          this.provider = new SESProvider();
          break;
        case 'smtp':
          this.provider = new SMTPProvider();
          break;
        default:
          throw new Error(`Unknown email provider: ${this.env.EMAIL_PROVIDER}`);
      }
    }
    return this.provider;
  }

  static async sendEmail(options: EmailOptions): Promise<EmailResult> {
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

        // Handle dynamic subject from template
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

        // Attachment logic (logo)
        const needsCidLogo = typeof html === 'string' && html.includes('cid:logo');
        const hasCidLogo = Array.isArray(options.attachments)
          && options.attachments.some((attachment: any) => attachment?.cid === 'logo');

        if (needsCidLogo && !hasCidLogo) {
          try {
            const logoUrl = this.env.LOGO_URL || 'https://i.ibb.co/Zt9jNcs/logo.png';
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

      // Validate
      if (!html && !text) {
        throw new Error('Either html, text, or template must be provided');
      }

      // Get provider
      const provider = this.getProvider();

      // Send email
      const result = await provider.send({
        to: options.to,
        from: {
          email: this.env.EMAIL_FROM_ADDRESS,
          name: this.env.EMAIL_FROM_NAME,
        },
        replyTo: this.env.EMAIL_REPLY_TO,
        subject: subject || 'Notification',
        html: html || '',
        text: text || TemplateService.stripHtml(html || ''),
        cc: options.cc,
        bcc: options.bcc,
        attachments: options.attachments,
      });

      // Log email (non-blocking)
      this.logEmail({
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: subject,
        template: options.template,
        status: 'sent',
        messageId: result.messageId,
        provider: this.env.EMAIL_PROVIDER,
        metadata: options.metadata,
      });

      return {
        success: true,
        messageId: result.messageId,
      };
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
        provider: this.env.EMAIL_PROVIDER,
        metadata: options.metadata,
      });

      return {
        success: false,
        error: error.message,
      };
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
    const supportEmail = params.supportEmail || this.env.TRIZEN_SUPPORT_EMAIL || 'support@trizenventures.com';
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
    const normalizedRole = this.normalizeRole(params.role);
    const supportEmail = params.supportEmail || this.env.TRIZEN_SUPPORT_EMAIL || 'support@trizenventures.com';
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
}
