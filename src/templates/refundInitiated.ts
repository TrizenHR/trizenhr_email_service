import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const refundInitiatedTemplate: EmailTemplate = {
  name: 'refund_initiated',
  subject: '↩️ Refund Initiated - ExtraHand',

  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Refund Initiated</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#F59E0B;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Refund Initiated
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Refund started</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Your refund is on its way</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.userName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Your refund has been initiated successfully.
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FFF7ED;border:1px solid #FDBA74;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Refund Amount:</td>
                        <td style="padding:4px 0;font-size:20px;color:#B45309;font-weight:700;text-align:right;">₹${data.amount || '0'}</td>
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
                    </table>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FEF3C7;border:1px solid #FCD34D;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="margin:0;color:#92400E;font-size:14px;line-height:1.6;">
                      ⏱️ <strong>Processing Time:</strong> The refund will be credited in ${data.processingTime || '5-7 days'}.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">This is an automated notification.</p>
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
↩️ Refund Initiated - ExtraHand

Hi ${data.userName || 'there'},

Your refund has been initiated successfully.

Refund Amount: ₹${data.amount || '0'}
${data.taskTitle ? `Task: ${data.taskTitle}` : ''}
${data.refundReason ? `Reason: ${data.refundReason}` : ''}

Processing Time: The refund will be credited in ${data.processingTime || '5-7 days'}.

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
