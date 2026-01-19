import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const accountSuspendedTemplate: EmailTemplate = {
  name: 'account_suspended',
  subject: 'Your ExtraHand Account Has Been Suspended',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Suspended</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#DC2626;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Account Notice
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Account ${data.action || 'Suspended'}</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Your account access has been restricted</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hello <strong>${data.name || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                We're reaching out to inform you that your ExtraHand account has been ${data.action?.toLowerCase() || 'suspended'}.
              </p>

              ${data.reason ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FEF2F2;border:1px solid #FCA5A5;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="margin:0 0 8px;color:#991B1B;font-size:14px;font-weight:600;">Reason:</p>
                    <p style="margin:0;color:#991B1B;font-size:14px;line-height:1.6;">${data.reason}</p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                While your account is ${data.action?.toLowerCase() || 'suspended'}, you will not be able to:
              </p>
              <ul style="margin:0 0 22px;padding-left:20px;color:#374151;font-size:15px;line-height:1.7;">
                <li>Access your dashboard</li>
                <li>Create or apply for tasks</li>
                <li>Send or receive messages</li>
                <li>Receive payments</li>
              </ul>

              ${data.appealUrl ? `
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                If you believe this is a mistake, you can appeal this decision:
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.appealUrl}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">Appeal Decision</a>
                  </td>
                </tr>
              </table>
              ` : ''}

              <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">
                If you have questions, please contact us at <a href="mailto:${data.supportEmail || 'support@extrahand.in'}" style="color:#F59E0B;text-decoration:none;">${data.supportEmail || 'support@extrahand.in'}</a>.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">This is an automated notification.</p>
              <p style="margin:0 0 8px;font-size:13px;">
                <a href="https://extrahand.in/terms" style="color:#F59E0B;text-decoration:none;">Terms of Service</a> ·
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
Account ${data.action || 'Suspended'} - ExtraHand

Hello ${data.name || 'there'},

We're reaching out to inform you that your ExtraHand account has been ${data.action?.toLowerCase() || 'suspended'}.

${data.reason ? `Reason: ${data.reason}` : ''}

While your account is ${data.action?.toLowerCase() || 'suspended'}, you will not be able to:
- Access your dashboard
- Create or apply for tasks
- Send or receive messages
- Receive payments

${data.appealUrl ? `If you believe this is a mistake, you can appeal: ${data.appealUrl}` : ''}

If you have questions, please contact us at ${data.supportEmail || 'support@extrahand.in'}.

This is an automated notification.
© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
