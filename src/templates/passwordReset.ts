import { EmailTemplate } from '../types';

export interface PasswordResetTemplateData {
  name?: string;
  resetLink: string;
  expiresAt?: string;
}

import { EXTRAHAND_LOGO_SVG } from './logo';

export const passwordResetTemplate: EmailTemplate = {
  name: 'password_reset',
  subject: 'Reset Your ExtraHand Admin Password',
  html: (data: PasswordResetTemplateData) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your ExtraHand Admin Password</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#0F172A;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              ExtraHand Admin
            </td>
          </tr>

          <tr>
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Password reset request</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Secure link to update your credentials</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hello ${data.name || 'there'},
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                We received a request to reset your ExtraHand Admin password. If you didn't request this, you can ignore this email.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:18px 0 12px;">
                    <a href="${data.resetLink}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-weight:700;font-size:16px;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 12px;color:#6b7280;font-size:14px;line-height:1.6;text-align:center;">
                If the button doesn't work, use this link:
              </p>
              <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:12px;font-size:12px;color:#374151;font-family:monospace;word-break:break-all;text-align:center;">
                ${data.resetLink}
              </div>

              ${data.expiresAt ? `
              <div style="margin:18px 0 0;background:#fffbeb;border-left:3px solid #F59E0B;border-radius:6px;padding:12px 14px;font-size:14px;color:#92400e;line-height:1.5;">
                <strong>Important:</strong> This link will expire on ${data.expiresAt}.
              </div>
              ` : ''}
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">
                If you have questions, please contact our support team.
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
  text: (data: PasswordResetTemplateData) => `
Hello ${data.name || 'there'},

We received a request to reset your ExtraHand Admin password. If you didn't make this request, you can ignore this email.

Reset link: ${data.resetLink}
${data.expiresAt ? `Important: This link will expire on ${data.expiresAt}.` : ''}

If you have any questions, please contact our support team.

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
This is an automated email. Please do not reply to this message.
  `,
};
