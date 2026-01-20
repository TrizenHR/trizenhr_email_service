import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const verificationRejectedTemplate: EmailTemplate = {
  name: 'verification_rejected',
  subject: '⚠️ Verification Needs Correction - ExtraHand',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Needs Correction</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#F59E0B;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Action Required
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Verification needs correction</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Please resubmit your documents</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.userName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                We couldn't verify your ${data.verificationType || 'documents'} due to the following reason:
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FEF2F2;border:1px solid #FCA5A5;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="margin:0 0 8px;font-size:12px;color:#DC2626;text-transform:uppercase;font-weight:600;">Reason:</p>
                    <p style="margin:0;color:#991B1B;font-size:14px;line-height:1.6;">${data.rejectionReason || 'The submitted document could not be verified. Please ensure the document is clear, valid, and matches your profile information.'}</p>
                  </td>
                </tr>
              </table>

              <p style="margin:16px 0 10px;color:#111827;font-size:15px;font-weight:600;">Tips for resubmission:</p>
              <ul style="margin:0 0 22px;padding-left:20px;color:#374151;font-size:15px;line-height:1.7;">
                <li>Ensure the document is clearly visible and not blurry</li>
                <li>Make sure all four corners are visible</li>
                <li>Use good lighting and avoid glare</li>
                <li>Submit the original document, not a photocopy</li>
                <li>Ensure the name matches your profile exactly</li>
              </ul>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.verificationUrl || 'https://extrahand.in/settings/verification'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">Resubmit Documents</a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;color:#6b7280;font-size:14px;text-align:center;">
                Need help? Contact us at <a href="mailto:support@extrahand.in" style="color:#F59E0B;text-decoration:none;">support@extrahand.in</a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">This is an automated email.</p>
              <p style="margin:0 0 8px;font-size:13px;">
                <a href="https://extrahand.in/help/verification" style="color:#F59E0B;text-decoration:none;">Verification Help</a> ·
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
⚠️ Verification Needs Correction - ExtraHand

Hi ${data.userName || 'there'},

We couldn't verify your ${data.verificationType || 'documents'} due to the following reason:

${data.rejectionReason || 'The submitted document could not be verified. Please ensure the document is clear, valid, and matches your profile information.'}

Tips for resubmission:
- Ensure the document is clearly visible and not blurry
- Make sure all four corners are visible
- Use good lighting and avoid glare
- Submit the original document, not a photocopy
- Ensure the name matches your profile exactly

Resubmit documents: ${data.verificationUrl || 'https://extrahand.in/settings/verification'}

Need help? Contact us at support@extrahand.in

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
