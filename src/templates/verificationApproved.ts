import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const verificationApprovedTemplate: EmailTemplate = {
  name: 'verification_approved',
  subject: '✅ Verification Approved - ExtraHand',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Approved</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#059669;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Verification Approved
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">You're verified! ✅</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Your documents have been verified</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.userName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Great news! Your ${data.verificationType || 'documents'} verification has been approved. You now have full access to all ExtraHand features.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ECFDF5;border:1px solid #6EE7B7;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;text-align:center;">
                    <p style="margin:0 0 8px;font-size:14px;color:#059669;">Verification Status</p>
                    <p style="margin:0;font-size:24px;color:#059669;font-weight:700;">✓ Approved</p>
                    ${data.verificationType ? `<p style="margin:8px 0 0;font-size:14px;color:#6b7280;">${data.verificationType}</p>` : ''}
                  </td>
                </tr>
              </table>

              <p style="margin:16px 0 10px;color:#111827;font-size:15px;font-weight:600;">What you can do now:</p>
              <ul style="margin:0 0 22px;padding-left:20px;color:#374151;font-size:15px;line-height:1.7;">
                <li>Your profile now shows a verified badge</li>
                <li>Apply to premium and verified-only tasks</li>
                <li>Receive payments directly to your bank</li>
                <li>Build trust with task requesters</li>
              </ul>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="https://extrahand.in/tasks" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">Browse Tasks</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">This is an automated email.</p>
              <p style="margin:0 0 8px;font-size:13px;">
                <a href="https://extrahand.in/profile" style="color:#F59E0B;text-decoration:none;">My Profile</a> ·
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
✅ Verification Approved - ExtraHand

Hi ${data.userName || 'there'},

Great news! Your ${data.verificationType || 'documents'} verification has been approved. You now have full access to all ExtraHand features.

Verification Status: ✓ Approved
${data.verificationType ? `Type: ${data.verificationType}` : ''}

What you can do now:
- Your profile now shows a verified badge
- Apply to premium and verified-only tasks
- Receive payments directly to your bank
- Build trust with task requesters

Browse tasks: https://extrahand.in/tasks

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
