import nodemailer from 'nodemailer';
import { validateEnv } from '../../config/env';
import logger from '../../config/logger';
import { EmailPayload, EmailResponse } from '../../types';

export class SMTPProvider {
  private transporter: nodemailer.Transporter;
  /** Second transporter — org sender (support@trizenventures.com) */
  private orgTransporter: nodemailer.Transporter | null = null;
  private isMicrosoft: boolean;
  private env: ReturnType<typeof validateEnv>;

  constructor() {
    this.env = validateEnv();
    this.isMicrosoft = this.detectMicrosoft();
    this.transporter = this.createTransporter(
      this.env.SMTP_USER,
      this.env.SMTP_PASS,
      this.env.SMTP_HOST,
      this.env.SMTP_PORT,
    );
    // Eagerly build org transporter if credentials are already present
    this.initOrgTransporter();
  }

  /**
   * Build (or rebuild) the org transporter from current env.
   * Called at construction and lazily on first send if orgTransporter is null.
   */
  private initOrgTransporter(): void {
    // Always re-read env so CapRover updates are picked up
    const env = validateEnv();
    if (env.SMTP_USER_ORG && env.SMTP_PASS_ORG) {
      const orgHost = env.SMTP_HOST_ORG || env.SMTP_HOST;
      const orgPort = env.SMTP_PORT_ORG || env.SMTP_PORT;
      this.orgTransporter = this.createTransporter(
        env.SMTP_USER_ORG,
        env.SMTP_PASS_ORG,
        orgHost,
        orgPort,
      );
      logger.info('SMTP org transporter initialised', {
        user: env.SMTP_USER_ORG,
        host: orgHost,
      });
    }
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

  private createTransporter(
    user: string,
    pass: string,
    host: string = this.env.SMTP_HOST,
    port: number = this.env.SMTP_PORT,
  ): nodemailer.Transporter {
    const isMicrosoftHost = host.toLowerCase().includes('outlook') ||
      host.toLowerCase().includes('office365') ||
      host.toLowerCase().includes('hotmail') ||
      host.toLowerCase().includes('microsoft');

    const config: any = {
      host,
      port,
      secure: this.env.SMTP_SECURE,
      auth: { user, pass },
      pool: true,
      maxConnections: isMicrosoftHost ? 10 : 5,
      maxMessages: isMicrosoftHost ? 500 : 100,
      rateDelta: 1000,
      rateLimit: isMicrosoftHost ? 30 : 10,
    };

    if (isMicrosoftHost) {
      config.requireTLS = true;
      config.tls = {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      };
      config.connectionTimeout = 10000;
      config.greetingTimeout = 5000;
      config.socketTimeout = 15000;
    }

    logger.info('SMTP transporter initialised', { host, port, user });
    return nodemailer.createTransport(config);
  }

  /**
   * Decide which transporter + from-address to use.
   * Re-reads env on every call so CapRover env updates are always reflected.
   * Lazy-initialises orgTransporter if it wasn't ready at construction time.
   */
  private resolveTransporter(fromEmail: string): {
    transport: nodemailer.Transporter;
    senderAddress: string;
    senderName: string;
  } {
    // Re-read env fresh every time
    const env = validateEnv();

    // Lazy-init org transporter if credentials appeared after construction
    if (!this.orgTransporter && env.SMTP_USER_ORG && env.SMTP_PASS_ORG) {
      this.initOrgTransporter();
    }

    const orgAddress = env.EMAIL_FROM_ADDRESS_ORG;
    const useOrg =
      this.orgTransporter !== null &&
      !!orgAddress &&
      fromEmail === orgAddress;

    logger.info('SMTPProvider transporter routing', {
      fromEmail,
      orgAddress,
      useOrg,
      orgTransporterReady: this.orgTransporter !== null,
    });

    if (useOrg) {
      return {
        transport: this.orgTransporter!,
        senderAddress: orgAddress!,
        senderName: env.EMAIL_FROM_NAME_ORG || 'TrizenVentures HR',
      };
    }

    // Platform sender — must use trizenhr mailbox (EMAIL_FROM_ADDRESS / SMTP_USER)
    const platformAddress = env.EMAIL_FROM_ADDRESS;
    if (
      this.isMicrosoft &&
      env.SMTP_USER.toLowerCase() !== platformAddress.toLowerCase()
    ) {
      logger.warn(
        'SMTP_USER does not match EMAIL_FROM_ADDRESS — Microsoft may send from the SMTP_USER mailbox',
        { smtpUser: env.SMTP_USER, emailFromAddress: platformAddress, requestedFrom: fromEmail }
      );
    }
    return {
      transport: this.transporter,
      senderAddress: platformAddress,
      senderName: env.EMAIL_FROM_NAME,
    };
  }

  async send(payload: EmailPayload): Promise<EmailResponse> {
    try {
      const { transport, senderAddress, senderName } =
        this.resolveTransporter(payload.from.email);

      const isMicrosoftSend =
        transport === this.transporter
          ? this.isMicrosoft
          : (this.env.SMTP_HOST_ORG || this.env.SMTP_HOST)
              .toLowerCase()
              .includes('office365') ||
            (this.env.SMTP_HOST_ORG || this.env.SMTP_HOST)
              .toLowerCase()
              .includes('outlook');

      // Convert attachments to nodemailer format with CID support
      const attachments = payload.attachments?.map(att => {
        const attachment: any = {
          filename: att.filename,
          content: att.content,
          contentType: att.contentType || 'application/octet-stream',
        };
        if (att.cid) {
          attachment.cid = att.cid;
        }
        logger.debug('Prepared attachment for email', {
          filename: att.filename,
          hasCid: !!att.cid,
          cid: att.cid,
          contentType: attachment.contentType,
          contentSize: Buffer.isBuffer(att.content)
            ? att.content.length
            : typeof att.content === 'string'
            ? att.content.length
            : 'unknown',
        });
        return attachment;
      });

      const mailOptions: nodemailer.SendMailOptions = {
        from: { name: senderName, address: senderAddress },
        to: payload.to,
        cc: payload.cc,
        bcc: payload.bcc,
        replyTo: payload.replyTo || senderAddress,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
        attachments,
        headers: {
          'X-Mailer': 'TrizenHR Email Service',
          'X-Priority': '3',
          // Let Exchange generate Message-ID / envelope sender — custom values can hurt deliverability
          ...(isMicrosoftSend
            ? {}
            : {
                'Message-ID': `<${Date.now()}-${Math.random().toString(36).substring(2, 15)}@${senderAddress.split('@')[1] || 'trizenhr.com'}>`,
                'Return-Path': senderAddress,
              }),
        },
      };

      logger.debug('Sending email via SMTP', {
        to: payload.to,
        subject: payload.subject,
        from: senderAddress,
        isMicrosoft: this.isMicrosoft,
        attachmentCount: attachments?.length || 0,
      });

      const info = await transport.sendMail(mailOptions);

      logger.info('Email sent successfully via SMTP', {
        messageId: info.messageId,
        from: senderAddress,
        to: payload.to,
        subject: payload.subject,
        accepted: info.accepted,
        rejected: info.rejected,
      });

      return {
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
      };
    } catch (error: any) {
      const { senderAddress } = this.resolveTransporter(payload.from.email);

      logger.error('SMTP send error', {
        error: error.message,
        code: error.code,
        command: error.command,
        from: senderAddress,
        to: payload.to,
      });

      if (this.isMicrosoft) {
        if (error.code === 'EAUTH') {
          const mailboxHint =
            senderAddress === this.env.EMAIL_FROM_ADDRESS_ORG
              ? `Organisation mailbox (${this.env.SMTP_USER_ORG}). Update SMTP_PASS_ORG with a Microsoft 365 app password for that account.`
              : `Platform mailbox (${this.env.SMTP_USER}). Update SMTP_PASS with a Microsoft 365 app password.`;
          throw new Error(
            `Microsoft authentication failed for ${senderAddress}. ${mailboxHint}`,
          );
        } else if (
          error.code === 'ETIMEDOUT' ||
          error.code === 'ECONNECTION'
        ) {
          throw new Error(
            'Connection to Microsoft SMTP server timed out. Check internet/firewall',
          );
        }
      }

      throw error;
    }
  }

  async verify(): Promise<{ primary: boolean; org: boolean }> {
    const result = { primary: false, org: false };

    try {
      await this.transporter.verify();
      result.primary = true;
      logger.info('Primary SMTP verified (support@trizenhr.com)', {
        host: this.env.SMTP_HOST,
        user: this.env.SMTP_USER,
      });
    } catch (error: any) {
      logger.error('Primary SMTP verification FAILED', {
        user: this.env.SMTP_USER,
        error: error.message,
        code: error.code,
      });
    }

    if (this.orgTransporter && this.env.SMTP_USER_ORG) {
      try {
        await this.orgTransporter.verify();
        result.org = true;
        logger.info('Org SMTP verified (support@trizenventures.com)', {
          user: this.env.SMTP_USER_ORG,
        });
      } catch (error: any) {
        logger.error(
          'Org SMTP verification FAILED — employee/HR/manager invites will not send',
          {
            user: this.env.SMTP_USER_ORG,
            error: error.message,
            code: error.code,
            hint: 'Set SMTP_PASS_ORG to a valid Microsoft 365 app password for support@trizenventures.com',
          }
        );
      }
    } else {
      logger.warn('Org SMTP not configured — staff invites cannot be sent');
    }

    return result;
  }

  close(): void {
    this.transporter.close();
    this.orgTransporter?.close();
    logger.info('SMTP connection pools closed');
  }
}
