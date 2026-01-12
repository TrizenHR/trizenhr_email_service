import mongoose, { Schema, Document } from 'mongoose';

export interface IEmailLog extends Document {
  to: string[];
  subject: string;
  template?: string;
  status: 'sent' | 'failed';
  messageId?: string;
  error?: string;
  provider: 'smtp' | 'sendgrid' | 'ses';
  metadata?: Record<string, any>;
  sentAt: Date;
  createdAt: Date;
}

const EmailLogSchema = new Schema<IEmailLog>({
  to: [{ type: String, required: true }],
  subject: { type: String, required: true },
  template: { type: String },
  status: { 
    type: String, 
    enum: ['sent', 'failed'], 
    required: true,
    index: true
  },
  messageId: { type: String },
  error: { type: String },
  provider: { 
    type: String, 
    enum: ['smtp', 'sendgrid', 'ses'], 
    required: true 
  },
  metadata: { type: Schema.Types.Mixed },
  sentAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Indexes for querying
EmailLogSchema.index({ sentAt: -1 });
EmailLogSchema.index({ status: 1, sentAt: -1 });
EmailLogSchema.index({ 'metadata.type': 1 });

export default mongoose.model<IEmailLog>('EmailLog', EmailLogSchema);
