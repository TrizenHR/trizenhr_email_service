import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const refundProcessedTemplate: EmailTemplate = {
  name: 'refund_processed',
  subject: '↩️ Refund Processed - ExtraHand',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Refund Processed</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#0F172A;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Refund Processed
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Refund issued</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Your refund has been processed</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.userName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Your refund has been processed and will be credited back to your original payment method.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td colspan="2" style="padding:0 0 12px;text-align:center;">
                          <p style="margin:0;font-size:14px;color:#6b7280;">Refund Amount</p>
                          <p style="margin:4px 0 0;font-size:32px;color:#111827;font-weight:700;">₹${data.amount || '0'}</p>
                        </td>
                      </tr>
                      ${data.taskTitle ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Task:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.taskTitle}</td>
                      </tr>
                      ` : ''}
                      ${data.refundReason ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Reason:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.refundReason}</td>
                      </tr>
                      ` : ''}
                      ${data.transactionId ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Refund ID:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.transactionId}</td>
                      </tr>
                      ` : ''}
                      ${data.originalTransactionId ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Original Transaction:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.originalTransactionId}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FEF3C7;border:1px solid #FCD34D;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="margin:0;color:#92400E;font-size:14px;line-height:1.6;">
                      ⏱️ <strong>Processing Time:</strong> Refunds typically take ${data.processingTime || '5-10 business days'} to appear in your account, depending on your bank.
                    </p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="https://extrahand.in/payments" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">View Payment History</a>
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
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">This is an automated notification.</p>
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
↩️ Refund Processed - ExtraHand

Hi ${data.userName || 'there'},

Your refund has been processed and will be credited back to your original payment method.

Refund Amount: ₹${data.amount || '0'}
${data.taskTitle ? `Task: ${data.taskTitle}` : ''}
${data.refundReason ? `Reason: ${data.refundReason}` : ''}
${data.transactionId ? `Refund ID: ${data.transactionId}` : ''}
${data.originalTransactionId ? `Original Transaction: ${data.originalTransactionId}` : ''}

Processing Time: Refunds typically take ${data.processingTime || '5-10 business days'} to appear in your account.

View payment history: https://extrahand.in/payments

Questions? Contact support@extrahand.in

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
