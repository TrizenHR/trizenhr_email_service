import { EmailTemplate } from '../types';

export interface SuspensionTemplateData {
  name: string;
  suspendedUntil: string; // ISO date string
  reason: string;
  daysRemaining: number;
  contactInfo?: string;
}

import { EXTRAHAND_LOGO_SVG } from './logo';

export const suspensionTemplate: EmailTemplate = {
  name: 'suspension',
  subject: 'Account Suspended - ExtraHand Content Admin',
  
  html: (data: SuspensionTemplateData) => {
    const expiryDate = new Date(data.suspendedUntil).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Suspended - ExtraHand Content Admin</title>
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
            <td style="background:#DC2626;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;font-weight:600;">
              Account Suspended
            </td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#DC2626;">Account Temporarily Suspended</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Your access has been temporarily restricted</p>
            </td>
          </tr>

          <!-- Content Section -->
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hello ${data.name},
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Your ExtraHand Content Admin account has been temporarily suspended. During this period, you will not be able to access the platform.
              </p>

              <!-- Suspension Details Card -->
              <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:20px;margin:20px 0;">
                <h3 style="margin:0 0 12px;font-size:16px;font-weight:600;color:#991B1B;">Suspension Details</h3>
                
                <div style="margin-bottom:12px;">
                  <span style="font-size:13px;color:#7F1D1D;font-weight:500;">Reason:</span>
                  <p style="margin:4px 0 0;font-size:15px;color:#991B1B;line-height:1.5;">${data.reason}</p>
                </div>
                
                <div style="margin-bottom:12px;">
                  <span style="font-size:13px;color:#7F1D1D;font-weight:500;">Suspension Expires:</span>
                  <p style="margin:4px 0 0;font-size:15px;color:#991B1B;font-weight:600;">${expiryDate}</p>
                </div>
                
                <div>
                  <span style="font-size:13px;color:#7F1D1D;font-weight:500;">Days Remaining:</span>
                  <p style="margin:4px 0 0;font-size:15px;color:#991B1B;font-weight:600;">${data.daysRemaining} day${data.daysRemaining !== 1 ? 's' : ''}</p>
                </div>
              </div>

              <!-- Important Notice -->
              <div style="background:#FFFBEB;border-left:4px solid #F59E0B;border-radius:6px;padding:16px;margin:20px 0;">
                <p style="margin:0;font-size:14px;color:#92400E;line-height:1.6;">
                  <strong>Important:</strong> Your account will be automatically restored on ${expiryDate}. You can log in again after the suspension period expires.
                </p>
              </div>

              <!-- Contact Information -->
              <div style="background:#F0F9FF;border:1px solid #BAE6FD;border-radius:8px;padding:16px;margin:20px 0;">
                <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#0C4A6E;">Need Help?</p>
                <p style="margin:0;font-size:14px;color:#075985;line-height:1.6;">
                  ${data.contactInfo || 'If you believe this suspension is an error, please contact your manager or administrator for assistance.'}
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">
                This is an automated notification from ExtraHand Content Admin.
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

  text: (data: SuspensionTemplateData) => {
    const expiryDate = new Date(data.suspendedUntil).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return `
EXTRAHAND CONTENT ADMIN - Account Suspended

Hello ${data.name},

Your ExtraHand Content Admin account has been temporarily suspended. During this period, you will not be able to access the platform.

SUSPENSION DETAILS:
Reason: ${data.reason}
Suspension Expires: ${expiryDate}
Days Remaining: ${data.daysRemaining} day${data.daysRemaining !== 1 ? 's' : ''}

IMPORTANT: Your account will be automatically restored on ${expiryDate}. You can log in again after the suspension period expires.

${data.contactInfo || 'If you believe this suspension is an error, please contact your manager or administrator for assistance.'}

This is an automated notification from ExtraHand Content Admin.
© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `;
  },
};
