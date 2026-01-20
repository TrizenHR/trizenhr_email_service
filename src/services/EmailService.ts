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

      // Render template if provided
      if (options.template) {
        const rendered = TemplateService.render(options.template, options.data || {});
        html = rendered.html;
        text = rendered.text;
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
        subject: options.subject,
        html: html || '',
        text: text || TemplateService.stripHtml(html || ''),
        cc: options.cc,
        bcc: options.bcc,
        attachments: options.attachments,
      });

      // Log email (non-blocking)
      this.logEmail({
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        template: options.template,
        status: 'sent',
        messageId: result.messageId,
        provider: this.env.EMAIL_PROVIDER,
        metadata: options.metadata,
      });

      logger.info('Email sent successfully', {
        to: options.to,
        subject: options.subject,
        template: options.template,
        messageId: result.messageId,
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

      // Log failed email (non-blocking)
      this.logEmail({
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
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
    // Don't await - log asynchronously to avoid blocking email sending
    EmailLog.create({
      ...data,
      sentAt: new Date(),
    }).catch((error: any) => {
      logger.error('Failed to log email', { error: error.message });
    });
  }

  // Convenience methods
  
  /**
   * Send admin invite email with logo as CID attachment (bulletproof for Outlook)
   */
  static async sendAdminInviteEmail(
    email: string,
    role: string,
    inviteLink: string,
    expiresAt: Date,
    team?: string,
    department?: string
  ) {
    // Always use CID attachment - fetch logo from URL and attach inline
    // This is the only bulletproof method for Outlook
    let logoAttachment: Array<{
      filename: string;
      content: Buffer;
      contentType: string;
      cid: string;
    }> | undefined = undefined;
    
    try {
      logger.info('Fetching logo for CID attachment', { email });
      
      // Fetch logo from the hosted URL (imgbb.co)
      const logoBuffer = await fetchLogoAsBuffer('https://i.ibb.co/Zt9jNcs/logo.png');
      
      if (logoBuffer) {
        logoAttachment = [{
          filename: 'logo.png',
          content: logoBuffer,
          contentType: 'image/png',
          cid: 'extrahand-logo', // Must match src="cid:extrahand-logo" in template
        }];
        logger.info('Logo attached with CID successfully', {
          email,
          logoSize: logoBuffer.length,
          cid: 'extrahand-logo',
        });
      } else {
        logger.warn('Logo fetch failed, email will be sent without logo', { email });
      }
    } catch (error: any) {
      logger.error('Failed to fetch logo for CID attachment', {
        error: error.message,
        stack: error.stack,
        email,
      });
      // Continue without logo - template will show broken image or nothing
    }

    return this.sendEmail({
      to: email,
      subject: "You've been invited to join ExtraHand Partner Onboarding Platform Team",
      template: 'admin_invite',
      data: {
        role,
        team,
        department,
        inviteLink,
        expiresAt,
      },
      attachments: logoAttachment, // CID attachment - bulletproof for Outlook
      metadata: { type: 'admin_invite' },
    });
  }

  static async sendAccountCreatedEmail(email: string, name: string, phone?: string) {
    return this.sendEmail({
      to: email,
      subject: 'Your ExtraHand Account is Ready!',
      template: 'account_created',
      data: {
        name,
        phone,
        loginUrl: `${this.env.WEB_APP_URL}/login`,
        supportEmail: 'support@extrahand.in',
      },
      metadata: { type: 'account_created' },
    });
  }

  /**
   * Send password reset email with logo as CID attachment (bulletproof for Outlook)
   */
  static async sendPasswordResetEmail(
    email: string,
    resetLink: string,
    name?: string,
    expiresAt?: Date
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

    // Always use CID attachment - fetch logo from URL and attach inline
    // This is the only bulletproof method for Outlook
    let logoAttachment: Array<{
      filename: string;
      content: Buffer;
      contentType: string;
      cid: string;
    }> | undefined = undefined;
    
    try {
      logger.info('Fetching logo for CID attachment', { email });
      
      // Fetch logo from the hosted URL (imgbb.co)
      const logoBuffer = await fetchLogoAsBuffer('https://i.ibb.co/Zt9jNcs/logo.png');
      
      if (logoBuffer) {
        logoAttachment = [{
          filename: 'logo.png',
          content: logoBuffer,
          contentType: 'image/png',
          cid: 'extrahand-logo', // Must match src="cid:extrahand-logo" in template
        }];
        logger.info('Logo attached with CID successfully', {
          email,
          logoSize: logoBuffer.length,
          cid: 'extrahand-logo',
        });
      } else {
        logger.warn('Logo fetch failed, email will be sent without logo', { email });
      }
    } catch (error: any) {
      logger.error('Failed to fetch logo for CID attachment', {
        error: error.message,
        stack: error.stack,
        email,
      });
      // Continue without logo - template will show broken image or nothing
    }

    return this.sendEmail({
      to: email,
      subject: 'Reset Your ExtraHand Admin Password',
      template: 'password_reset',
      data: {
        name: name || email.split('@')[0],
        resetLink,
        expiresAt: formattedExpiresAt,
      },
      attachments: logoAttachment, // CID attachment - bulletproof for Outlook
      metadata: { type: 'password_reset' },
    });
  }
}
