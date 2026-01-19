import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const emailVerificationTemplate: EmailTemplate = {
  name: 'email_verification',
  subject: 'Verify Your Email Address - ExtraHand',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email Address</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#0F172A;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Email Verification
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Verify your email</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Confirm your email address to continue</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hello${data.name ? ` <strong>${data.name}</strong>` : ''},
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Please verify your email address to complete your ExtraHand account setup. Click the button below or use the verification code.
              </p>

              ${data.otp ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;text-align:center;">
                    <p style="margin:0 0 8px;font-size:14px;color:#6b7280;">Your verification code</p>
                    <p style="margin:0;font-size:32px;font-weight:700;color:#111827;letter-spacing:4px;">${data.otp}</p>
                  </td>
                </tr>
              </table>
              ` : ''}

              ${data.verificationLink ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:20px 0 10px;">
                    <a href="${data.verificationLink}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">Verify Email</a>
                  </td>
                </tr>
              </table>
              ` : ''}

              ${data.expiresAt ? `
              <p style="margin:18px 0 0;color:#6b7280;font-size:14px;text-align:center;">
                This ${data.otp ? 'code' : 'link'} expires on ${data.expiresAt}
              </p>
              ` : ''}

              <p style="margin:22px 0 0;color:#374151;font-size:15px;line-height:1.6;">
                If you didn't create an account on ExtraHand, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">This is an automated email.</p>
              <p style="margin:0 0 8px;font-size:13px;">
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
Verify Your Email Address - ExtraHand

Hello${data.name ? ` ${data.name}` : ''},

Please verify your email address to complete your ExtraHand account setup.

${data.otp ? `Your verification code: ${data.otp}` : ''}
${data.verificationLink ? `Verification link: ${data.verificationLink}` : ''}
${data.expiresAt ? `This ${data.otp ? 'code' : 'link'} expires on ${data.expiresAt}` : ''}

If you didn't create an account on ExtraHand, you can safely ignore this email.

This is an automated email. Please do not reply.
© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
