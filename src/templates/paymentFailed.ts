import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const paymentFailedTemplate: EmailTemplate = {
  name: 'payment_failed',
  subject: '⚠️ Payment Failed - Action Required - ExtraHand',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Failed</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#DC2626;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Payment Failed
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Payment unsuccessful</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Please retry your payment</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.userName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                We were unable to process your payment. Please try again or use a different payment method.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FEF2F2;border:1px solid #FCA5A5;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Amount:</td>
                        <td style="padding:4px 0;font-size:20px;color:#DC2626;font-weight:700;text-align:right;">₹${data.amount || '0'}</td>
                      </tr>
                      ${data.taskTitle ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Task:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.taskTitle}</td>
                      </tr>
                      ` : ''}
                      ${data.failureReason ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Reason:</td>
                        <td style="padding:4px 0;font-size:14px;color:#991B1B;text-align:right;">${data.failureReason}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:16px 0 10px;color:#111827;font-size:15px;font-weight:600;">Common reasons for payment failure:</p>
              <ul style="margin:0 0 22px;padding-left:20px;color:#374151;font-size:15px;line-height:1.7;">
                <li>Insufficient funds</li>
                <li>Card expired or incorrect details</li>
                <li>Transaction declined by bank</li>
                <li>Network connectivity issues</li>
              </ul>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.retryUrl || data.taskUrl || 'https://extrahand.in/payments'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">Retry Payment</a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;color:#6b7280;font-size:14px;text-align:center;">
                Need help? Contact us at <a href="mailto:support@extrahand.in" style="color:#F59E0B;text-decoration:none;">support@extrahand.in</a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">This is an automated notification.</p>
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
⚠️ Payment Failed - ExtraHand

Hi ${data.userName || 'there'},

We were unable to process your payment. Please try again or use a different payment method.

Amount: ₹${data.amount || '0'}
${data.taskTitle ? `Task: ${data.taskTitle}` : ''}
${data.failureReason ? `Reason: ${data.failureReason}` : ''}

Common reasons for payment failure:
- Insufficient funds
- Card expired or incorrect details
- Transaction declined by bank
- Network connectivity issues

Retry payment: ${data.retryUrl || data.taskUrl || 'https://extrahand.in/payments'}

Need help? Contact support@extrahand.in

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
