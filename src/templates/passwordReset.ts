import { EmailTemplate } from '../types';

export interface PasswordResetTemplateData {
  name?: string;
  resetLink: string;
  expiresAt?: string;
}

// ExtraHand Logo SVG (inline)
const extrahandLogoSVG = `
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="48" height="48" rx="8" fill="#F59E0B"/>
  <text x="24" y="32" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">EH</text>
</svg>
`;

export const passwordResetTemplate: EmailTemplate = {
  name: 'password_reset',
  subject: 'Reset Your ExtraHand Admin Password',
  html: (data: PasswordResetTemplateData) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Reset Your ExtraHand Admin Password</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center" style="padding: 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #ffffff; padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #e5e7eb;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    ${extrahandLogoSVG}
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #1f2937; line-height: 1.3;">
                      Password Reset Request
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Hello ${data.name || 'there'},
              </p>
              
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                We received a request to reset your password for your ExtraHand Admin account. If you didn't make this request, you can safely ignore this email.
              </p>

              <p style="margin: 0 0 30px; color: #374151; font-size: 16px; line-height: 1.6;">
                To reset your password, please click the button below:
              </p>

              <!-- Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 30px;">
                    <a href="${data.resetLink}" style="display: inline-block; background-color: #F59E0B; color: #ffffff !important; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px; color: #6b7280; font-size: 14px; line-height: 1.6;">
                Or copy and paste this link into your browser:
              </p>
              <p style="margin: 0 0 30px; color: #3b82f6; font-size: 14px; line-height: 1.6; word-break: break-all;">
                ${data.resetLink}
              </p>

              ${data.expiresAt ? `
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background-color: #fffbeb; border-left: 3px solid #F59E0B; border-radius: 4px; padding: 16px; margin-bottom: 20px;">
                    <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                      <strong>Important:</strong> This link will expire on ${data.expiresAt}.
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                If you have any questions or concerns, please contact our support team.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; color: #6b7280; font-size: 12px; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} ExtraHand. All rights reserved.
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                This is an automated email. Please do not reply to this message.
              </p>
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

We received a request to reset your password for your ExtraHand Admin account. If you didn't make this request, you can safely ignore this email.

To reset your password, please click the link below:
${data.resetLink}

${data.expiresAt ? `Important: This link will expire on ${data.expiresAt}.` : ''}

If you have any questions or concerns, please contact our support team.

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
This is an automated email. Please do not reply to this message.
  `,
};
