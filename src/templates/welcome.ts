import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const welcomeTemplate: EmailTemplate = {
  name: 'welcome',
  subject: 'Welcome to ExtraHand!',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ExtraHand!</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#0F172A;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Welcome to ExtraHand
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Welcome aboard! 🎉</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Your journey with ExtraHand begins now</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hello <strong>${data.name}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Thank you for joining ExtraHand! We're thrilled to have you as part of our community. Whether you're here to find help or offer your skills, you're in the right place.
              </p>

              <p style="margin:16px 0 10px;color:#111827;font-size:15px;font-weight:600;">Here's what you can do next:</p>
              <ul style="margin:0 0 22px;padding-left:20px;color:#374151;font-size:15px;line-height:1.7;">
                <li>Complete your profile to stand out</li>
                <li>Browse available tasks in your area</li>
                <li>Set up your skills and preferences</li>
                <li>Get verified for more opportunities</li>
              </ul>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:20px 0 10px;">
                    <a href="${data.loginUrl}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">Get Started</a>
                  </td>
                </tr>
              </table>

              <p style="margin:22px 0 0;color:#374151;font-size:15px;line-height:1.6;">
                Need help? Contact us at <a href="mailto:${data.supportEmail}" style="color:#F59E0B;text-decoration:none;">${data.supportEmail}</a>.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">This is an automated email.</p>
              <p style="margin:0 0 8px;font-size:13px;">
                <a href="${data.loginUrl}" style="color:#F59E0B;text-decoration:none;">Login</a> ·
                <a href="https://extrahand.in/help" style="color:#F59E0B;text-decoration:none;">Help Center</a> ·
                <a href="https://extrahand.in/contact" style="color:#F59E0B;text-decoration:none;">Contact Us</a>
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
Welcome to ExtraHand!

Hello ${data.name},

Thank you for joining ExtraHand! We're thrilled to have you as part of our community.

Here's what you can do next:
- Complete your profile to stand out
- Browse available tasks in your area
- Set up your skills and preferences
- Get verified for more opportunities

Get started: ${data.loginUrl}

Need help? ${data.supportEmail}

This is an automated email. Please do not reply.
© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
