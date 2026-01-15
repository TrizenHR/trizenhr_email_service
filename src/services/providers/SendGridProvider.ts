import sgMail from '@sendgrid/mail';
import { validateEnv } from '../../config/env';
import logger from '../../config/logger';
import { EmailPayload, EmailResponse } from '../../types';

export class SendGridProvider {
  private env: ReturnType<typeof validateEnv>;

  constructor() {
    this.env = validateEnv();
    
    if (!this.env.SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is required for SendGrid provider');
    }
    
    sgMail.setApiKey(this.env.SENDGRID_API_KEY);
    logger.info('SendGrid provider initialized');
  }

  async send(payload: EmailPayload): Promise<EmailResponse> {
    try {
      const msg: any = {
        to: payload.to,
        from: {
          email: payload.from.email,
          name: payload.from.name,
        },
        replyTo: payload.replyTo,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
        cc: payload.cc,
        bcc: payload.bcc,
        attachments: payload.attachments?.map(att => ({
          content: Buffer.isBuffer(att.content) 
            ? att.content.toString('base64') 
            : att.content,
          filename: att.filename,
          type: att.contentType,
          disposition: att.cid ? 'inline' : 'attachment', // Inline for CID attachments
          contentId: att.cid, // Content-ID for inline images
        })),
      };

      const [response] = await sgMail.send(msg);

      logger.info('Email sent via SendGrid', {
        statusCode: response.statusCode,
        messageId: response.headers['x-message-id'],
      });

      return {
        messageId: response.headers['x-message-id'] as string,
      };
    } catch (error: any) {
      logger.error('SendGrid send error', {
        error: error.message,
        response: error.response?.body,
      });
      throw error;
    }
  }

  async verify(): Promise<boolean> {
    return !!this.env.SENDGRID_API_KEY;
  }
}
