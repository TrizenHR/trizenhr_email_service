import { EmailTemplate } from '../types';

export interface AdminInviteTemplateData {
  role: string;
  team?: string;
  department?: string;
  inviteLink: string;
  expiresAt: Date;
  name?: string;
}

import { EXTRAHAND_LOGO_SVG } from './logo';

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
  <style type="text/css">
    /* Mobile Responsive Styles */
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
        padding: 16px 8px !important;
      }
      .email-content {
        width: 100% !important;
        max-width: 100% !important;
        padding: 0 !important;
        border-radius: 8px !important;
      }
      .email-header {
        padding: 20px 16px 14px !important;
      }
      .email-title {
        font-size: 20px !important;
        line-height: 1.3 !important;
      }
      .email-subtitle {
        font-size: 12px !important;
      }
      .logo-image {
        max-width: 60px !important;
        width: 60px !important;
        height: auto !important;
      }
      .role-box {
        width: 100% !important;
        max-width: 100% !important;
        padding: 12px 14px !important;
        margin: 0 auto 12px !important;
      }
      .role-label {
        font-size: 10px !important;
        display: block !important;
        margin-bottom: 4px !important;
        margin-right: 0 !important;
      }
      .role-value {
        font-size: 13px !important;
        margin-left: 0 !important;
        display: block !important;
      }
      .button-container {
        padding: 8px 0 12px !important;
      }
      .button {
        padding: 14px 24px !important;
        font-size: 15px !important;
        width: 100% !important;
        max-width: 100% !important;
        display: block !important;
        margin: 0 auto !important;
        min-width: auto !important;
      }
      .link-box {
        padding: 12px 10px !important;
        font-size: 10px !important;
        word-break: break-all !important;
        line-height: 1.4 !important;
      }
      .warning-box {
        padding: 12px !important;
        font-size: 12px !important;
        margin: 14px 0 0 !important;
        line-height: 1.5 !important;
      }
      .footer {
        padding: 14px 16px !important;
      }
      .footer-text {
        font-size: 11px !important;
      }
      .footer-copyright {
        font-size: 10px !important;
      }
      /* Make text more readable on mobile */
      p {
        font-size: 14px !important;
        line-height: 1.6 !important;
      }
    }
    /* Prevent auto-linking on iOS */
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;" class="email-container">
    <tr>
      <td align="center">
        <table role="presentation" width="520" cellspacing="0" cellpadding="0" style="max-width:520px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(15,23,42,0.12);" class="email-content">
          
          <tr>
            <td style="background:#0F172A;color:#ffffff;padding:10px 20px;font-size:12px;letter-spacing:0.25px;text-align:center;">
              Partner Onboarding Platform
            </td>
          </tr>
          
          <tr>
            <td style="padding:24px 28px 18px;text-align:center;border-bottom:1px solid #e5e7eb;" class="email-header">
              <div style="margin-bottom:12px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:22px;font-weight:600;color:#111827;line-height:1.35;" class="email-title">You're Invited</h1>
              <p style="margin:6px 0 0;font-size:13px;color:#6b7280;" class="email-subtitle">Join the ExtraHand ${roleDisplay} Team</p>
            </td>
          </tr>
          
          <tr>
            <td style="padding:22px 28px 24px;" class="email-content">
              <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#374151;">
                ${data.name ? `Hello ${data.name},` : 'Hello,'}
              </p>
              <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#374151;">
                You've been invited to join the <strong>ExtraHand Partner Onboarding Platform</strong> with the role below:
              </p>

              <table role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <table role="presentation" width="80%" cellspacing="0" cellpadding="0" style="max-width:420px;width:100%;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 12px;" class="role-box">
                      <tr>
                        <td style="padding:10px 18px;text-align:center;">
                          <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:11px;color:#6b7280;letter-spacing:0.16px;text-transform:uppercase;font-weight:500;display:inline-block;" class="role-label">
                            ROLE:
                          </span>
                          <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#111827;font-weight:700;letter-spacing:0.06px;margin-left:4px;display:inline-block;" class="role-value">
                            ${roleDisplay}
                          </span>
                        </td>
                      </tr>
                      ${data.team ? `
                      <tr>
                        <td style="padding:0 0 ${data.department ? '10px' : '0'};">
                          <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:12px;color:#6b7280;letter-spacing:0.18px;text-transform:uppercase;font-weight:500;">Team</span>
                        </td>
                        <td style="padding:0 0 ${data.department ? '10px' : '0'};text-align:right;">
                          <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:15px;color:#111827;font-weight:700;letter-spacing:0.08px;">${data.team}</span>
                        </td>
                      </tr>
                      ` : ''}
                      ${data.department ? `
                      <tr>
                        <td style="padding:0;">
                          <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:12px;color:#6b7280;letter-spacing:0.18px;text-transform:uppercase;font-weight:500;">Department</span>
                        </td>
                        <td style="padding:0;text-align:right;">
                          <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:15px;color:#111827;font-weight:700;letter-spacing:0.08px;">${data.department}</span>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 14px;" class="button-container">
                    <a href="${data.inviteLink}" style="display:inline-block;background:#F59E0B;color:#ffffff !important;text-decoration:none;padding:10px 22px;border-radius:4px;font-size:15px;font-weight:700;min-width:140px;text-align:center;-webkit-text-size-adjust:100%;" class="button">
                      Accept Invite
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;font-size:12px;color:#6b7280;text-align:center;">
                If the button doesn't work, copy and paste this link:
              </p>
              <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:10px;font-size:11px;color:#374151;font-family:monospace;word-break:break-all;text-align:center;max-width:100%;overflow-wrap:break-word;" class="link-box">
                ${data.inviteLink}
              </div>

              <div style="margin:16px 0 0;background:#fffbeb;border-left:3px solid #F59E0B;border-radius:6px;padding:10px 12px;font-size:13px;color:#92400e;line-height:1.5;" class="warning-box">
                <strong>Important:</strong> This invite expires on <strong>${expiryDate}</strong>. Please accept it before the specified date.
              </div>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:16px 28px;text-align:center;border-top:1px solid #e5e7eb;" class="footer">
              <p style="margin:0 0 6px;font-size:12px;color:#6b7280;line-height:1.6;" class="footer-text">
                Automated message from <strong style="color:#111827;">ExtraHand</strong>.
              </p>
              <p style="margin:0;font-size:11px;color:#9ca3af;" class="footer-copyright">
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

You've been invited to the ExtraHand Partner Onboarding Platform.

Role: ${roleDisplay}
${data.team ? `Team: ${data.team}` : ''}
${data.department ? `Department: ${data.department}` : ''}

Accept invite: ${data.inviteLink}

Important: This invite expires on ${expiryDate}. Please accept it before then.

This is an automated message from ExtraHand.
© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `;
  }
};
