import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const documentReminderTemplate: EmailTemplate = {
  name: 'document_reminder',
  subject: '📄 Reminder: Complete Your Document Upload - ExtraHand',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document Upload Reminder</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#0F172A;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Reminder
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Documents still missing</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Complete your verification to unlock all features</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.userName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                We noticed you haven't completed your document verification yet. Upload your documents to get verified and access all ExtraHand features.
              </p>

              ${data.pendingDocuments && data.pendingDocuments.length > 0 ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FEF3C7;border:1px solid #FCD34D;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="margin:0 0 8px;font-size:12px;color:#92400E;text-transform:uppercase;font-weight:600;">Missing Documents:</p>
                    <ul style="margin:0;padding-left:20px;color:#92400E;font-size:14px;line-height:1.7;">
                      ${data.pendingDocuments.map((doc: string) => `<li>${doc}</li>`).join('')}
                    </ul>
                  </td>
                </tr>
              </table>
              ` : ''}

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">
                      ⏱️ <strong>Verification usually takes less than 24 hours.</strong> The sooner you upload, the sooner you can start earning!
                    </p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.verificationUrl || 'https://extrahand.in/settings/verification'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">Upload Documents</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">This is an automated reminder.</p>
              <p style="margin:0 0 8px;font-size:13px;">
                <a href="https://extrahand.in/settings/notifications" style="color:#F59E0B;text-decoration:none;">Notification Settings</a> ·
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
📄 Reminder: Complete Your Document Upload - ExtraHand

Hi ${data.userName || 'there'},

We noticed you haven't completed your document verification yet.

${data.pendingDocuments && data.pendingDocuments.length > 0 ? 
  `Missing Documents:\n${data.pendingDocuments.map((doc: string) => `- ${doc}`).join('\n')}` : ''}

Verification usually takes less than 24 hours. The sooner you upload, the sooner you can start earning!

Upload documents: ${data.verificationUrl || 'https://extrahand.in/settings/verification'}

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
