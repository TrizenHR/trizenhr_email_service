import { EmailTemplate } from '../types';

export interface BanTemplateData {
  name: string;
  reason: string;
  contactInfo?: string;
  platformName?: string;
}

import { EXTRAHAND_LOGO_SVG } from './logo';

export const banTemplate: EmailTemplate = {
  name: 'ban',
  subject: (data: BanTemplateData) => {
    const platformName = data.platformName || 'Partner Onboarding Platform';
    return `Account Banned - ${platformName}`;
  },
  
  html: (data: BanTemplateData) => {
    const platformName = data.platformName || 'Partner Onboarding Platform';
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Banned - ExtraHand Content Admin</title>
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      background: #f5f5f5;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        padding: 16px !important;
      }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <!-- Header Bar -->
          <tr>
            <td style="background:#991B1B;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;font-weight:600;">
              Account Permanently Banned
            </td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#991B1B;">Account Permanently Banned</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Your access has been permanently revoked</p>
            </td>
          </tr>

          <!-- Content Section -->
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hello ${data.name},
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Your ${platformName} account has been permanently banned. You will no longer be able to access the platform.
              </p>

              <!-- Ban Details Card -->
              <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:20px;margin:20px 0;">
                <h3 style="margin:0 0 12px;font-size:16px;font-weight:600;color:#991B1B;">Ban Details</h3>
                
                <div>
                  <span style="font-size:13px;color:#7F1D1D;font-weight:500;">Reason:</span>
                  <p style="margin:4px 0 0;font-size:15px;color:#991B1B;line-height:1.5;">${data.reason}</p>
                </div>
              </div>

              <!-- Important Notice -->
              <div style="background:#FEF2F2;border-left:4px solid #DC2626;border-radius:6px;padding:16px;margin:20px 0;">
                <p style="margin:0;font-size:14px;color:#991B1B;line-height:1.6;">
                  <strong>Important:</strong> This ban is permanent and cannot be reversed. Your account access has been permanently revoked.
                </p>
              </div>

              <!-- Contact Information -->
              <div style="background:#F0F9FF;border:1px solid #BAE6FD;border-radius:8px;padding:16px;margin:20px 0;">
                <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#0C4A6E;">Appeal Process</p>
                <p style="margin:0;font-size:14px;color:#075985;line-height:1.6;">
                  ${data.contactInfo || 'If you believe this ban was issued in error, you may contact your manager or administrator to discuss the matter. However, please note that ban decisions are typically final.'}
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">
                This is an automated notification from ${platformName}.
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
  `;
  },

  text: (data: BanTemplateData) => {
    const platformName = data.platformName || 'Partner Onboarding Platform';
    return `
${platformName.toUpperCase()} - Account Banned

Hello ${data.name},

Your ${platformName} account has been permanently banned. You will no longer be able to access the platform.

BAN DETAILS:
Reason: ${data.reason}

IMPORTANT: This ban is permanent and cannot be reversed. Your account access has been permanently revoked.

${data.contactInfo || 'If you believe this ban was issued in error, you may contact your manager or administrator to discuss the matter. However, please note that ban decisions are typically final.'}

This is an automated notification from ${platformName}.
© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `;
  },
};
