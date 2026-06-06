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
          organizationName: data.organizationName,
          role: data.role,
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
      // HR / Manager / Employee invitations  → support@trizenventures.com (org SMTP)
      // Company Admin / org onboarding / platform notifications → support@trizenhr.com
      const normalizedRole = options.metadata?.role
        ? this.normalizeRole(String(options.metadata.role))
        : '';
      const orgStaffRoles = new Set(['hr_admin', 'manager', 'employee']);
      let useOrgSender =
        options.metadata?.type === 'trizen_demo_invite' ||
        (options.metadata?.type === 'trizen_role_invite' &&
          orgStaffRoles.has(normalizedRole));

      if (env.SMTP_PLATFORM_USE_ORG) {
        useOrgSender = true;
      }

      let fromAddress = env.EMAIL_FROM_ADDRESS;
      let fromName = env.EMAIL_FROM_NAME;
      let replyTo = env.EMAIL_REPLY_TO || env.EMAIL_FROM_ADDRESS;

      if (useOrgSender) {
        if (!env.EMAIL_FROM_ADDRESS_ORG || !env.SMTP_USER_ORG || !env.SMTP_PASS_ORG) {
          throw new Error(
            'Organisation email sender is not configured (EMAIL_FROM_ADDRESS_ORG, SMTP_USER_ORG, SMTP_PASS_ORG). ' +
              'HR/Manager/Employee invites must be sent from support@trizenventures.com.'
          );
        }
        fromAddress = env.EMAIL_FROM_ADDRESS_ORG;
        fromName = env.EMAIL_FROM_NAME_ORG || 'TrizenVentures';
        replyTo = env.EMAIL_FROM_ADDRESS_ORG;
      }

      logger.info('Sender routing decision', {
        type: options.metadata?.type,
        role: normalizedRole || options.metadata?.role,
        useOrgSender,
        fromAddress,
        to: options.to,
      });

      const provider = this.getProvider();

      const result = await provider.send({
        to: options.to,
        from: { email: fromAddress, name: fromName },
        replyTo,
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

  /** Normalize invite role slugs for templates and sender routing. */
  private static normalizeRole(role: string): string {
    const normalized = (role || '').trim().toLowerCase().replace(/\s+/g, '_');

    if (
      normalized === 'admin' ||
      normalized === 'company_admin' ||
      normalized === 'companyadmin'
    ) {
      return 'company_admin';
    }
    if (normalized === 'hr' || normalized === 'hr_admin') {
      return 'hr_admin';
    }
    if (normalized === 'supervisor' || normalized === 'manager') {
      return 'manager';
    }
    if (normalized === 'employee') {
      return 'employee';
    }
    if (normalized === 'super_admin' || normalized === 'superadmin') {
      return 'company_admin';
    }

    return normalized;
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
    platformSupportEmail?: string;
    companyAdminRole?: string;
  }) {
    const env = this.getEnv();
    const platformName = params.platformName || 'TrizenHR';
    const companyAdminRole = this.normalizeRole(
      params.companyAdminRole || 'company_admin'
    );
    // Internal copy goes to platform inbox (trizenhr.com), not org staff mailbox
    const platformNotifyInbox =
      params.platformSupportEmail || env.EMAIL_FROM_ADDRESS;

    logger.info('[EmailService] organization-created invite', {
      companyAdminEmail: params.companyAdminEmail,
      companyAdminRole,
    });

    const supportNotificationResult = await this.sendEmail({
      to: platformNotifyInbox,
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
      role: companyAdminRole,
      inviteLink: params.companyAdminInviteLink,
      expiresAt: params.inviteExpiresAt,
      organizationName: params.organizationName,
      inviterName: params.createdByName || 'System Admin',
      platformName,
      name: params.companyAdminName,
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
    const platformName = params.platformName || 'TrizenHR';
    const roleLabel = this.getRoleLabel(normalizedRole);

    logger.info('[EmailService] sendTrizenRoleInvitationEmail', {
      to: params.email,
      role: normalizedRole,
      organizationName: params.organizationName,
      expectedFrom:
        normalizedRole === 'company_admin'
          ? env.EMAIL_FROM_ADDRESS
          : env.EMAIL_FROM_ADDRESS_ORG || '(org sender not configured)',
    });

    // Platform onboarding copy goes to TrizenHR mailbox, not the org support inbox
    const platformSupportBcc =
      normalizedRole === 'company_admin' ? env.EMAIL_FROM_ADDRESS : undefined;

    const emailSubject = params.organizationName
      ? `${params.organizationName} — You're invited as ${roleLabel}`
      : `${platformName} Invitation — ${roleLabel}`;

    const result = await this.sendEmail({
      to: params.email,
      bcc: platformSupportBcc,
      subject: emailSubject,
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

    if (result.success) {
      logger.info('[EmailService] Invitation delivered via SMTP', {
        to: params.email,
        role: normalizedRole,
        messageId: result.messageId,
      });
    }

    return result;
  }

  static async sendTrizenDemoInvitationEmail(params: {
    email: string;
    role: string;
    inviteLink: string;
    inviteExpiresAt: Date;
    demoAccessTtlDays: number;
    companyName: string;
    inviterName?: string;
    platformName?: string;
    name?: string;
  }) {
    const env = this.getEnv();
    const normalizedRole = this.normalizeRole(params.role);
    const platformName = params.platformName || 'TrizenHR Demo';
    const roleLabel = this.getRoleLabel(normalizedRole);

    logger.info('[EmailService] sendTrizenDemoInvitationEmail', {
      to: params.email,
      role: normalizedRole,
      companyName: params.companyName,
    });

    const emailSubject = `${params.companyName} — Try Trizen HR (${roleLabel} demo)`;

    return this.sendEmail({
      to: params.email,
      subject: emailSubject,
      template: 'trizen_demo_invite',
      data: {
        role: normalizedRole,
        inviteLink: params.inviteLink,
        inviteExpiresAt: params.inviteExpiresAt,
        demoAccessTtlDays: params.demoAccessTtlDays,
        companyName: params.companyName,
        platformName,
        name: params.name,
        inviterName: params.inviterName,
      },
      metadata: {
        type: 'trizen_demo_invite',
        role: normalizedRole,
        companyName: params.companyName,
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
