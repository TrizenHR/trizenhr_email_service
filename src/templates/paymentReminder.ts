import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const paymentReminderTemplate: EmailTemplate = {
  name: 'payment_reminder',
  subject: '⏰ Payment Reminder - ExtraHand',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Reminder</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#F59E0B;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Payment Reminder
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Payment pending</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">You have an outstanding payment</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.userName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                This is a friendly reminder that you have a pending payment for the following task.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FEF3C7;border:1px solid #FCD34D;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td colspan="2" style="padding:0 0 12px;text-align:center;">
                          <p style="margin:0;font-size:14px;color:#92400E;">Amount Due</p>
                          <p style="margin:4px 0 0;font-size:32px;color:#92400E;font-weight:700;">₹${data.amount || '0'}</p>
                        </td>
                      </tr>
                      ${data.taskTitle ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Task:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.taskTitle}</td>
                      </tr>
                      ` : ''}
                      ${data.dueDate ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Due Date:</td>
                        <td style="padding:4px 0;font-size:14px;color:#DC2626;font-weight:600;text-align:right;">${data.dueDate}</td>
                      </tr>
                      ` : ''}
                      ${data.taskerName ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Tasker:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.taskerName}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">
                      💡 <strong>Tip:</strong> Complete your payment to release the funds to your tasker and allow them to leave a review.
                    </p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.paymentUrl || data.taskUrl || 'https://extrahand.in/payments'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">Complete Payment</a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;color:#6b7280;font-size:14px;text-align:center;">
                Questions? Contact us at <a href="mailto:support@extrahand.in" style="color:#F59E0B;text-decoration:none;">support@extrahand.in</a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">This is an automated reminder.</p>
              <p style="margin:0 0 8px;font-size:13px;">
                <a href="https://extrahand.in/payments" style="color:#F59E0B;text-decoration:none;">Payments</a> ·
                <a href="https://extrahand.in/help" style="color:#F59E0B;text-decoration:none;">Help Center</a>
              </p>
              <p style="margin:0;color:#9ca3af;font-size:12px;">© ${new Date().getFullYear()} ExtraHand. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `,
  
  text: (data: any) => `
⏰ Payment Reminder - ExtraHand

Hi ${data.userName || 'there'},

This is a friendly reminder that you have a pending payment.

Amount Due: ₹${data.amount || '0'}
${data.taskTitle ? `Task: ${data.taskTitle}` : ''}
${data.dueDate ? `Due Date: ${data.dueDate}` : ''}
${data.taskerName ? `Tasker: ${data.taskerName}` : ''}

Complete your payment to release the funds to your tasker.

Complete payment: ${data.paymentUrl || data.taskUrl || 'https://extrahand.in/payments'}

Questions? Contact support@extrahand.in

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
