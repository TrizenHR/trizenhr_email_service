import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const loginAlertTemplate: EmailTemplate = {
  name: 'login_alert',
  subject: '🔐 New Login Detected - ExtraHand',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Login Detected</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#DC2626;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Security Alert
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">New login detected</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">We noticed a login to your account</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hello <strong>${data.name || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                We detected a new login to your ExtraHand account. If this was you, no action is needed.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:16px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      ${data.device ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Device:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.device}</td>
                      </tr>
                      ` : ''}
                      ${data.browser ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Browser:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.browser}</td>
                      </tr>
                      ` : ''}
                      ${data.location ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Location:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.location}</td>
                      </tr>
                      ` : ''}
                      ${data.ip ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">IP Address:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.ip}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Time:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.loginTime || new Date().toLocaleString()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FEF2F2;border:1px solid #FCA5A5;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="margin:0;color:#991B1B;font-size:14px;line-height:1.6;">
                      <strong>Wasn't you?</strong> If you didn't make this login, your account may be compromised. Please change your password immediately.
                    </p>
                  </td>
                </tr>
              </table>

              ${data.resetPasswordUrl ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0;">
                    <a href="${data.resetPasswordUrl}" style="display:inline-block;background:#DC2626;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">Secure My Account</a>
                  </td>
                </tr>
              </table>
              ` : ''}

              <p style="margin:22px 0 0;color:#374151;font-size:15px;line-height:1.6;">
                Need help? Contact us at <a href="mailto:${data.supportEmail || 'support@extrahand.in'}" style="color:#F59E0B;text-decoration:none;">${data.supportEmail || 'support@extrahand.in'}</a>.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">This is an automated security notification.</p>
              <p style="margin:0 0 8px;font-size:13px;">
                <a href="https://extrahand.in/settings/security" style="color:#F59E0B;text-decoration:none;">Security Settings</a> ·
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
🔐 New Login Detected - ExtraHand

Hello ${data.name || 'there'},

We detected a new login to your ExtraHand account. If this was you, no action is needed.

Login Details:
${data.device ? `- Device: ${data.device}` : ''}
${data.browser ? `- Browser: ${data.browser}` : ''}
${data.location ? `- Location: ${data.location}` : ''}
${data.ip ? `- IP Address: ${data.ip}` : ''}
- Time: ${data.loginTime || new Date().toLocaleString()}

Wasn't you? If you didn't make this login, your account may be compromised. Please change your password immediately.

${data.resetPasswordUrl ? `Secure your account: ${data.resetPasswordUrl}` : ''}

Need help? ${data.supportEmail || 'support@extrahand.in'}

This is an automated security notification.
© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
