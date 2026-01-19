import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const paymentReceivedTemplate: EmailTemplate = {
  name: 'payment_received',
  subject: '💰 Payment Received - ExtraHand',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Received</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#059669;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Payment Successful
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Payment received! 💰</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Your payment was processed successfully</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.userName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Your payment has been received and processed successfully.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ECFDF5;border:1px solid #6EE7B7;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Amount:</td>
                        <td style="padding:4px 0;font-size:20px;color:#059669;font-weight:700;text-align:right;">₹${data.amount || '0'}</td>
                      </tr>
                      ${data.taskTitle ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Task:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.taskTitle}</td>
                      </tr>
                      ` : ''}
                      ${data.transactionId ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Transaction ID:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.transactionId}</td>
                      </tr>
                      ` : ''}
                      ${data.paymentDate ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Date:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.paymentDate}</td>
                      </tr>
                      ` : ''}
                      ${data.paymentMethod ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Payment Method:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.paymentMethod}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              ${data.isEscrow ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">
                      🔒 <strong>Payment held in escrow.</strong> The funds will be released to the tasker once you confirm task completion.
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.receiptUrl || data.taskUrl || 'https://extrahand.in/payments'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">View Receipt</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">This is an automated payment confirmation.</p>
              <p style="margin:0 0 8px;font-size:13px;">
                <a href="https://extrahand.in/payments" style="color:#F59E0B;text-decoration:none;">Payment History</a> ·
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
💰 Payment Received - ExtraHand

Hi ${data.userName || 'there'},

Your payment has been received and processed successfully.

Amount: ₹${data.amount || '0'}
${data.taskTitle ? `Task: ${data.taskTitle}` : ''}
${data.transactionId ? `Transaction ID: ${data.transactionId}` : ''}
${data.paymentDate ? `Date: ${data.paymentDate}` : ''}
${data.paymentMethod ? `Payment Method: ${data.paymentMethod}` : ''}

${data.isEscrow ? 'Payment held in escrow. The funds will be released to the tasker once you confirm task completion.' : ''}

View receipt: ${data.receiptUrl || data.taskUrl || 'https://extrahand.in/payments'}

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
