export interface EmailPayload {
  to: string | string[];
  from: {
    email: string;
    name: string;
  };
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
    cid?: string; // Content-ID for inline images
  }>;
}

export interface EmailResponse {
  messageId: string;
  accepted?: string[];
  rejected?: string[];
}

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  template?: string;
  data?: Record<string, any>;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
    cid?: string; // Content-ID for inline images
  }>;
  priority?: 'high' | 'normal' | 'low';
  metadata?: Record<string, any>;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface EmailTemplate {
  name: string;
  subject: string;
  html: (data: any) => string;
  text: (data: any) => string;
}
