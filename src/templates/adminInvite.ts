import { EmailTemplate } from '../types';

export interface AdminInviteTemplateData {
  role: string;
  team?: string;
  department?: string;
  inviteLink: string;
  expiresAt: Date;
  name?: string;
}

// ExtraHand Logo SVG (inline)
const extrahandLogoSVG = `
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="48" height="48" rx="8" fill="#F59E0B"/>
  <text x="24" y="32" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">EH</text>
</svg>
`;

export const adminInviteTemplate: EmailTemplate = {
  name: 'admin_invite',
  subject: "You've been invited to join ExtraHand Admin Team",
  
  html: (data: AdminInviteTemplateData) => {
    const roleDisplay = data.role.charAt(0).toUpperCase() + data.role.slice(1);
    const expiryDate = new Date(data.expiresAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>You're Invited to Join ExtraHand Admin Team</title>
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
                      You're Invited
                    </h1>
                    <p style="margin: 8px 0 0; font-size: 14px; color: #6b7280;">
                      Join the ExtraHand Admin Team
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
                ${data.name ? `Hello ${data.name},` : 'Hello,'}
              </p>
              
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
                You've been invited to join the <strong>ExtraHand Partner Onboarding Platform</strong> with the following role:
              </p>
              
              <!-- Role Info -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; margin: 24px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td>
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">Role</p>
                              </td>
                              <td align="right">
                                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">${roleDisplay}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ${data.team ? `
                      <tr>
                        <td style="padding-top: 12px; padding-bottom: 12px; ${data.department ? 'border-bottom: 1px solid #e5e7eb;' : ''}">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td>
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">Team</p>
                              </td>
                              <td align="right">
                                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">${data.team}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ` : ''}
                      ${data.department ? `
                      <tr>
                        <td style="padding-top: 12px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td>
                                <p style="margin: 0; font-size: 14px; color: #6b7280;">Department</p>
                              </td>
                              <td align="right">
                                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">${data.department}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding: 32px 0 24px;">
                    <a href="${data.inviteLink}" style="display: inline-block; background-color: #F59E0B; color: #ffffff !important; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: 600;">
                      Accept Invite
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Alternative Link -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 8px;">
                    <p style="margin: 0; font-size: 13px; color: #6b7280; text-align: center;">
                      If the button doesn't work, copy and paste this link:
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 24px;">
                    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px;">
                      <p style="margin: 0; font-size: 12px; color: #6b7280; font-family: monospace; word-break: break-all;">
                        ${data.inviteLink}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
              
              <!-- Expiry Notice -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background-color: #fffbeb; border-left: 3px solid #F59E0B; border-radius: 4px; padding: 16px;">
                    <p style="margin: 0; font-size: 14px; color: #92400e; line-height: 1.5;">
                      <strong>Important:</strong> This invite expires on <strong>${expiryDate}</strong>. Please accept it before then.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 32px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 12px; font-size: 14px; color: #6b7280; line-height: 1.6;">
                This is an automated message from <strong style="color: #1f2937;">ExtraHand</strong>.
              </p>
              <p style="margin: 0 0 16px; font-size: 14px; color: #6b7280;">
                If you have any questions, please contact your administrator.
              </p>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
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
  `;
  },
  
  text: (data: AdminInviteTemplateData) => {
    const roleDisplay = data.role.charAt(0).toUpperCase() + data.role.slice(1);
    const expiryDate = new Date(data.expiresAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return `
EXTRAHAND - You're Invited to Join the Admin Team

${data.name ? `Hello ${data.name},` : 'Hello,'}

You've been invited to join the ExtraHand Partner Onboarding Platform with the following role:

Role: ${roleDisplay}
${data.team ? `Team: ${data.team}` : ''}
${data.department ? `Department: ${data.department}` : ''}

To get started, visit this link to accept your invite:

${data.inviteLink}

IMPORTANT: This invite expires on ${expiryDate}. Please accept it before then.

This is an automated message from ExtraHand.
If you have any questions, please contact your administrator.

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `;
  }
};
