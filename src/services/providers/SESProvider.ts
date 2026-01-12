import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { validateEnv } from '../../config/env';
import logger from '../../config/logger';
import { EmailPayload, EmailResponse } from '../../types';

export class SESProvider {
  private client: SESClient;
  private env: ReturnType<typeof validateEnv>;

  constructor() {
    this.env = validateEnv();
    
    if (!this.env.AWS_ACCESS_KEY_ID || !this.env.AWS_SECRET_ACCESS_KEY) {
      throw new Error('AWS credentials are required for SES provider');
    }

    this.client = new SESClient({
      region: this.env.AWS_REGION,
      credentials: {
        accessKeyId: this.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: this.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    logger.info('AWS SES provider initialized', {
      region: this.env.AWS_REGION,
    });
  }

  async send(payload: EmailPayload): Promise<EmailResponse> {
    try {
      const command = new SendEmailCommand({
        Source: `${payload.from.name} <${payload.from.email}>`,
        Destination: {
          ToAddresses: Array.isArray(payload.to) ? payload.to : [payload.to],
          CcAddresses: payload.cc ? (Array.isArray(payload.cc) ? payload.cc : [payload.cc]) : undefined,
          BccAddresses: payload.bcc ? (Array.isArray(payload.bcc) ? payload.bcc : [payload.bcc]) : undefined,
        },
        Message: {
          Subject: {
            Data: payload.subject,
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: payload.html,
              Charset: 'UTF-8',
            },
            Text: {
              Data: payload.text,
              Charset: 'UTF-8',
            },
          },
        },
        ReplyToAddresses: payload.replyTo ? [payload.replyTo] : undefined,
      });

      const response = await this.client.send(command);

      logger.info('Email sent via AWS SES', {
        messageId: response.MessageId,
      });

      return {
        messageId: response.MessageId!,
      };
    } catch (error: any) {
      logger.error('AWS SES send error', {
        error: error.message,
        code: error.Code,
      });
      throw error;
    }
  }

  async verify(): Promise<boolean> {
    return true;
  }
}
