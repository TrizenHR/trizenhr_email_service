import { EmailTemplate } from '../types';

// Account & Auth Templates
import { accountCreatedTemplate } from './accountCreated';
import { adminInviteTemplate } from './adminInvite';
import { passwordResetTemplate } from './passwordReset';
import { welcomeTemplate } from './welcome';
import { emailVerificationTemplate } from './emailVerification';
import { loginAlertTemplate } from './loginAlert';
import { accountSuspendedTemplate } from './accountSuspended';

// Task Templates
import { taskCreatedRecommendedTemplate } from './taskCreatedRecommended';
import { taskCreatedKeywordTemplate } from './taskCreatedKeyword';
import { applicationSubmittedTemplate } from './applicationSubmitted';
import { applicationAcceptedTemplate } from './applicationAccepted';
import { applicationRejectedTemplate } from './applicationRejected';
import { taskUpdatedTemplate } from './taskUpdated';
import { taskReminderTemplate } from './taskReminder';
import { taskCompletedTemplate } from './taskCompleted';
import { reviewRequestTemplate } from './reviewRequest';

// Verification Templates
import { verificationRequestTemplate } from './verificationRequest';
import { verificationApprovedTemplate } from './verificationApproved';
import { verificationRejectedTemplate } from './verificationRejected';
import { documentReminderTemplate } from './documentReminder';
import { verificationStatusTemplate } from './verificationStatus';

// Payment Templates
import { paymentReceivedTemplate } from './paymentReceived';
import { paymentFailedTemplate } from './paymentFailed';
import { escrowReleasedTemplate } from './escrowReleased';
import { refundProcessedTemplate } from './refundProcessed';
import { invoiceTemplate } from './invoice';
import { paymentReminderTemplate } from './paymentReminder';

export const templates: Record<string, EmailTemplate> = {
  // Account & Auth
  account_created: accountCreatedTemplate,
  admin_invite: adminInviteTemplate,
  password_reset: passwordResetTemplate,
  welcome: welcomeTemplate,
  email_verification: emailVerificationTemplate,
  login_alert: loginAlertTemplate,
  account_suspended: accountSuspendedTemplate,

  // Task
  task_created_recommended: taskCreatedRecommendedTemplate,
  task_created_keyword: taskCreatedKeywordTemplate,
  application_submitted: applicationSubmittedTemplate,
  application_accepted: applicationAcceptedTemplate,
  application_rejected: applicationRejectedTemplate,
  task_updated: taskUpdatedTemplate,
  task_reminder: taskReminderTemplate,
  task_completed: taskCompletedTemplate,
  review_request: reviewRequestTemplate,

  // Verification
  verification_request: verificationRequestTemplate,
  verification_approved: verificationApprovedTemplate,
  verification_rejected: verificationRejectedTemplate,
  document_reminder: documentReminderTemplate,
  verification_status: verificationStatusTemplate,

  // Payment
  payment_received: paymentReceivedTemplate,
  payment_failed: paymentFailedTemplate,
  escrow_released: escrowReleasedTemplate,
  refund_processed: refundProcessedTemplate,
  invoice: invoiceTemplate,
  payment_reminder: paymentReminderTemplate,
};

export function getTemplate(name: string): EmailTemplate | undefined {
  return templates[name];
}
