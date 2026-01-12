import { EmailTemplate } from '../types';

export interface AdminInviteTemplateData {
  role: string;
  team?: string;
  department?: string;
  inviteLink: string;
  expiresAt: Date;
  name?: string;
}

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
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(to bottom right, #f9fafb, #fef3c7); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <!-- Wrapper Table -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(to bottom right, #f9fafb, #fef3c7); padding: 40px 20px;">
    <tr>
      <td align="center" style="padding: 0;">
        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06); overflow: hidden;">
          
          <!-- Header with Logo -->
          <tr>
            <td style="background: linear-gradient(to right, #fef3c7, #fed7aa); padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #fde68a;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <!-- Logo Placeholder - Replace with actual logo URL -->
                    <div style="width: 64px; height: 64px; background: #f59e0b; border-radius: 12px; margin: 0 auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                      <span style="color: #ffffff; font-size: 28px; font-weight: bold;">EH</span>
                    </div>
                    <!-- Alternative: Use actual logo image -->
                    <!-- <img src="https://extrahand.in/logo.png" alt="ExtraHand Logo" width="64" height="64" style="border-radius: 12px; display: block; margin: 0 auto;"> -->
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #1f2937; line-height: 1.2;">
                      You're Invited!
                    </h1>
                    <p style="margin: 8px 0 0; font-size: 16px; color: #6b7280;">
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
              <!-- Welcome Message -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 24px;">
                    <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #374151; text-align: center;">
                      You've been invited to join the <strong style="color: #1f2937;">ExtraHand Tasker Onboarding Platform</strong> with the following role:
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Role Info Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(to bottom right, #fef3c7, #fed7aa); border: 1px solid #fde68a; border-radius: 8px; margin: 24px 0;">
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 12px; border-bottom: 1px solid #fde68a;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="padding: 0;">
                                <p style="margin: 0; font-size: 14px; font-weight: 500; color: #6b7280;">Role</p>
                              </td>
                              <td align="right" style="padding: 0;">
                                <span style="display: inline-block; background: #f59e0b; color: #ffffff; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                                  ${roleDisplay}
                                </span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ${data.team ? `
                      <tr>
                        <td style="padding-top: 12px; padding-bottom: 12px; border-bottom: 1px solid #fde68a;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="padding: 0;">
                                <p style="margin: 0; font-size: 14px; font-weight: 500; color: #6b7280;">Team</p>
                              </td>
                              <td align="right" style="padding: 0;">
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
                              <td style="padding: 0;">
                                <p style="margin: 0; font-size: 14px; font-weight: 500; color: #6b7280;">Department</p>
                              </td>
                              <td align="right" style="padding: 0;">
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
                    <a href="${data.inviteLink}" style="display: inline-block; background: #f59e0b; color: #ffffff !important; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(245, 158, 11, 0.3);">
                      Accept Invite & Join Team
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
                    <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px; word-break: break-all;">
                      <p style="margin: 0; font-size: 12px; color: #6b7280; font-family: monospace;">
                        ${data.inviteLink}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
              
              <!-- Expiry Notice -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 6px; padding: 16px;">
                    <p style="margin: 0; font-size: 14px; color: #92400e; line-height: 1.5;">
                      <strong>⏰ Important:</strong> This invite expires on <strong>${expiryDate}</strong>. Please accept it before then.
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Next Steps -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding-top: 32px;">
                    <p style="margin: 0 0 16px; font-size: 15px; font-weight: 600; color: #1f2937;">
                      What happens next?
                    </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 4px 0;">
                          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #4b5563;">
                            1. Click the invite link above<br>
                            2. Create your password<br>
                            3. You'll be granted access to the admin dashboard<br>
                            4. Start managing tasker onboarding!
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background: #f9fafb; padding: 32px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
                      This is an automated message from <strong style="color: #1f2937;">ExtraHand</strong>.
                    </p>
                    <p style="margin: 8px 0 0; font-size: 14px; color: #6b7280;">
                      If you have any questions, please contact your administrator.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 16px;">
                    <a href="https://extrahand.in" style="color: #f59e0b; text-decoration: none; font-size: 14px; font-weight: 500;">
                      Visit ExtraHand →
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 24px;">
                    <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                      © ${new Date().getFullYear()} ExtraHand. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
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
═══════════════════════════════════════════════════════════
                    EXTRAHAND
          You're Invited to Join the Admin Team!
═══════════════════════════════════════════════════════════

You've been invited to join the ExtraHand Tasker Onboarding Platform with the following role:

Role: ${roleDisplay}
${data.team ? `Team: ${data.team}` : ''}
${data.department ? `Department: ${data.department}` : ''}

───────────────────────────────────────────────────────────

To get started, visit this link to accept your invite:

${data.inviteLink}

───────────────────────────────────────────────────────────

⏰ IMPORTANT: This invite expires on ${expiryDate}. Please accept it before then.

───────────────────────────────────────────────────────────

What happens next?

1. Click the invite link above
2. Create your password
3. You'll be granted access to the admin dashboard
4. Start managing tasker onboarding!

───────────────────────────────────────────────────────────

This is an automated message from ExtraHand.
If you have any questions, please contact your administrator.

Visit ExtraHand: https://extrahand.in

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `;
  }
};
