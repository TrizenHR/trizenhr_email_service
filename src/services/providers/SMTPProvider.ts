import nodemailer from 'nodemailer';
import { validateEnv } from '../../config/env';
import logger from '../../config/logger';
import { EmailPayload, EmailResponse } from '../../types';

export class SMTPProvider {
  private transporter: nodemailer.Transporter;
  private isMicrosoft: boolean;
  private env: ReturnType<typeof validateEnv>;

  constructor() {
    this.env = validateEnv();
    this.isMicrosoft = this.detectMicrosoft();
    this.transporter = this.createTransporter();
  }

  private detectMicrosoft(): boolean {
    const host = this.env.SMTP_HOST.toLowerCase();
    return (
      host.includes('outlook') ||
      host.includes('office365') ||
      host.includes('hotmail') ||
      host.includes('microsoft')
    );
  }

  private createTransporter(): nodemailer.Transporter {
    const config: any = {
      host: this.env.SMTP_HOST,
      port: this.env.SMTP_PORT,
      secure: this.env.SMTP_SECURE,
      auth: {
        user: this.env.SMTP_USER,
        pass: this.env.SMTP_PASS,
      },
      pool: true,
      maxConnections: this.isMicrosoft ? 10 : 5,
      maxMessages: this.isMicrosoft ? 500 : 100,
      rateDelta: 1000,
      rateLimit: this.isMicrosoft ? 30 : 10,
    };

    if (this.isMicrosoft) {
      // Microsoft-specific configuration – mirror the known working Trizen setup
      config.requireTLS = true;
      config.tls = {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      };
      // Reduced timeouts for faster failure detection and better latency
      config.connectionTimeout = 10000; // Reduced from 60000 to 10 seconds
      config.greetingTimeout = 5000;   // Reduced from 30000 to 5 seconds
      config.socketTimeout = 15000;     // Reduced from 60000 to 15 seconds

      logger.info('SMTP Provider initialized with Microsoft optimizations', {
        host: this.env.SMTP_HOST,
        port: this.env.SMTP_PORT,
        user: this.env.SMTP_USER,
      });
    } else {
      logger.info('SMTP Provider initialized', {
        host: this.env.SMTP_HOST,
        port: this.env.SMTP_PORT,
      });
    }

    return nodemailer.createTransport(config);
  }

  async send(payload: EmailPayload): Promise<EmailResponse> {
    try {
      const fromEmail = this.isMicrosoft ? this.env.SMTP_USER : payload.from.email;
      const emailDomain = fromEmail.split('@')[1] || 'extrahand.in';
      const messageId = `<${Date.now()}-${Math.random().toString(36).substring(2, 15)}@${emailDomain}>`;

      // Convert attachments to nodemailer format with CID support
      const attachments = payload.attachments?.map(att => {
        const attachment: any = {
          filename: att.filename,
          content: att.content,
          contentType: att.contentType || 'application/octet-stream',
        };
        
        // Add CID for inline images (nodemailer uses 'cid' property)
        if (att.cid) {
          attachment.cid = att.cid; // CID without 'cid:' prefix
        }
        
        logger.debug('Prepared attachment for email', {
          filename: att.filename,
          hasCid: !!att.cid,
          cid: att.cid,
          contentType: attachment.contentType,
          contentSize: Buffer.isBuffer(att.content) ? att.content.length : typeof att.content === 'string' ? att.content.length : 'unknown',
        });
        
        return attachment;
      });

      const mailOptions: nodemailer.SendMailOptions = {
        from: {
          name: payload.from.name,
          address: fromEmail,
        },
        to: payload.to,
        cc: payload.cc,
        bcc: payload.bcc,
        replyTo: payload.replyTo || fromEmail,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
        attachments, // Use converted attachments with CID support
        headers: {
          'X-Mailer': 'ExtraHand Email Service',
          'X-Priority': '3',
          'Message-ID': messageId,
          'Return-Path': fromEmail,
        },
      };

      if (this.isMicrosoft) {
        mailOptions.headers = {
          ...mailOptions.headers,
          'X-MS-Exchange-Organization-AuthAs': 'Internal',
          'X-MS-Exchange-Organization-AuthMechanism': '04',
        };
      }

      logger.debug('Sending email via SMTP', {
        to: payload.to,
        subject: payload.subject,
        from: fromEmail,
        isMicrosoft: this.isMicrosoft,
        attachmentCount: attachments?.length || 0,
        attachments: attachments?.map(att => ({
          filename: att.filename,
          cid: att.cid,
          contentType: att.contentType,
        })),
      });

      const info = await this.transporter.sendMail(mailOptions);

      logger.info('Email sent successfully via SMTP', {
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
      });

      return {
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
      };
    } catch (error: any) {
      logger.error('SMTP send error', {
        error: error.message,
        code: error.code,
        command: error.command,
      });

      if (this.isMicrosoft) {
        if (error.code === 'EAUTH') {
          throw new Error(
            'Microsoft authentication failed. Check email/password or use App Password'
          );
        } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNECTION') {
          throw new Error(
            'Connection to Microsoft SMTP server timed out. Check internet/firewall'
          );
        }
      }

      throw error;
    }
  }

  async verify(): Promise<boolean> {
    try {
      await this.transporter.verify();
      logger.info('SMTP connection verified successfully', {
        host: this.env.SMTP_HOST,
        user: this.env.SMTP_USER,
      });
      return true;
    } catch (error: any) {
      logger.error('SMTP verification failed', {
        error: error.message,
        code: error.code,
      });
      return false;
    }
  }

  close(): void {
    this.transporter.close();
    logger.info('SMTP connection pool closed');
  }
}
