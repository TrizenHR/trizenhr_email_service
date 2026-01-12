import { EmailTemplate } from '../types';

// ExtraHand Logo SVG (inline)
const extrahandLogoSVG = `
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="48" height="48" rx="8" fill="#F59E0B"/>
  <text x="24" y="32" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">EH</text>
</svg>
`;

export const accountCreatedTemplate: EmailTemplate = {
  name: 'account_created',
  subject: 'Your ExtraHand Account is Ready!',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Your ExtraHand Account is Ready!</title>
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
                      Welcome to ExtraHand!
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
                Hello <strong>${data.name}</strong>,
              </p>
              
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Your account has been successfully created on ExtraHand! We're excited to have you join our community of skilled taskers.
              </p>
              
              ${data.phone ? `
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; margin: 20px 0;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0; font-size: 14px; color: #374151;">
                      <strong>Your Phone Number:</strong> ${data.phone}
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}
              
              <p style="margin: 20px 0 12px; color: #374151; font-size: 16px; line-height: 1.6;">
                You can now:
              </p>
              <ul style="margin: 0 0 30px; padding-left: 20px; color: #374151; font-size: 16px; line-height: 1.8;">
                <li>Browse and apply for tasks in your area</li>
                <li>Build your profile and showcase your skills</li>
                <li>Start earning money by completing tasks</li>
                <li>Get verified to unlock more opportunities</li>
              </ul>
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding: 30px 0;">
                    <a href="${data.loginUrl}" style="display: inline-block; background-color: #F59E0B; color: #ffffff !important; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: 600;">
                      Login to Your Account
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 12px; color: #374151; font-size: 16px; line-height: 1.6;">
                <strong>Next Steps:</strong>
              </p>
              <ol style="margin: 0 0 30px; padding-left: 20px; color: #374151; font-size: 16px; line-height: 1.8;">
                <li>Complete your profile</li>
                <li>Add your skills and experience</li>
                <li>Upload profile photo</li>
                <li>Get verified (optional but recommended)</li>
              </ol>
              
              <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6;">
                If you have any questions or need assistance, our support team is here to help at <a href="mailto:${data.supportEmail}" style="color: #F59E0B; text-decoration: none;">${data.supportEmail}</a>.
              </p>
              
              <p style="margin: 30px 0 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Best regards,<br>
                <strong>The ExtraHand Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 12px; color: #6b7280; font-size: 12px; line-height: 1.5;">
                This is an automated email. Please do not reply to this message.
              </p>
              <p style="margin: 0 0 12px; color: #6b7280; font-size: 12px; line-height: 1.5;">
                <a href="${data.loginUrl}" style="color: #F59E0B; text-decoration: none;">Login</a> • 
                <a href="https://extrahand.in/help" style="color: #F59E0B; text-decoration: none;">Help Center</a> • 
                <a href="https://extrahand.in/contact" style="color: #F59E0B; text-decoration: none;">Contact Us</a>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                © ${new Date().getFullYear()} ExtraHand. All rights reserved.
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
  
  text: (data: any) => `
Welcome to ExtraHand!

Hello ${data.name},

Your account has been successfully created on ExtraHand! We're excited to have you join our community of skilled taskers.

${data.phone ? `Your Phone Number: ${data.phone}\n` : ''}

You can now:
- Browse and apply for tasks in your area
- Build your profile and showcase your skills
- Start earning money by completing tasks
- Get verified to unlock more opportunities

Login to your account: ${data.loginUrl}

Next Steps:
1. Complete your profile
2. Add your skills and experience
3. Upload profile photo
4. Get verified (optional but recommended)

If you have any questions or need assistance, our support team is here to help at ${data.supportEmail}.

Best regards,
The ExtraHand Team

---
This is an automated email. Please do not reply to this message.
© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
