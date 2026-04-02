import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const payoutInitiatedTemplate: EmailTemplate = {
  name: 'payout_initiated',
  subject: '💸 Payout Initiated - ExtraHand',

  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payout Initiated</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#2563EB;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Payout Initiated
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Payout started</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Your earnings are being sent</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.userName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Your payout has been initiated successfully.
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#EFF6FF;border:1px solid #93C5FD;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Payout Amount:</td>
                        <td style="padding:4px 0;font-size:20px;color:#1D4ED8;font-weight:700;text-align:right;">₹${data.amount || '0'}</td>
                      </tr>
                      ${data.taskTitle ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Task:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.taskTitle}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#DBEAFE;border:1px solid #60A5FA;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="margin:0;color:#1E3A8A;font-size:14px;line-height:1.6;">
                      ⏱️ <strong>Processing Time:</strong> The payout will be credited in ${data.processingTime || 'a few minutes'}.
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
💸 Payout Initiated - ExtraHand

Hi ${data.userName || 'there'},

Your payout has been initiated successfully.

Payout Amount: ₹${data.amount || '0'}
${data.taskTitle ? `Task: ${data.taskTitle}` : ''}

Processing Time: The payout will be credited in ${data.processingTime || 'a few minutes'}.

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
