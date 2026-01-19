import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const verificationStatusTemplate: EmailTemplate = {
  name: 'verification_status',
  subject: '${data.verificationType} Verification ${data.status === "approved" ? "✅ Approved" : data.status === "rejected" ? "⚠️ Needs Attention" : "Update"} - ExtraHand',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.verificationType || 'Document'} Verification Status</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:${data.status === 'approved' ? '#059669' : data.status === 'rejected' ? '#DC2626' : '#0F172A'};color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              ${data.verificationType || 'Document'} Verification ${data.status === 'approved' ? 'Approved' : data.status === 'rejected' ? 'Rejected' : 'Update'}
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">
                ${data.verificationType || 'Document'} ${data.status === 'approved' ? 'Verified ✅' : data.status === 'rejected' ? 'Needs Attention ⚠️' : 'Status Update'}
              </h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">
                ${data.status === 'approved' ? 'Your verification was successful' : data.status === 'rejected' ? 'Please review and resubmit' : 'Your verification status has been updated'}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.userName || 'there'}</strong>,
              </p>

              ${data.status === 'approved' ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ECFDF5;border:1px solid #6EE7B7;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;text-align:center;">
                    <p style="margin:0 0 8px;font-size:14px;color:#059669;">Status</p>
                    <p style="margin:0;font-size:24px;color:#059669;font-weight:700;">✓ Verified</p>
                    <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">${data.verificationType || 'Document'}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Your ${data.verificationType || 'document'} has been verified successfully. This verification will help build trust with other users on the platform.
              </p>
              ` : data.status === 'rejected' ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FEF2F2;border:1px solid #FCA5A5;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;text-align:center;">
                    <p style="margin:0 0 8px;font-size:14px;color:#DC2626;">Status</p>
                    <p style="margin:0;font-size:24px;color:#DC2626;font-weight:700;">✗ Rejected</p>
                    <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">${data.verificationType || 'Document'}</p>
                  </td>
                </tr>
              </table>
              ${data.rejectionReason ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="margin:0 0 8px;font-size:12px;color:#6b7280;text-transform:uppercase;">Reason:</p>
                    <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">${data.rejectionReason}</p>
                  </td>
                </tr>
              </table>
              ` : ''}
              ` : `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;text-align:center;">
                    <p style="margin:0 0 8px;font-size:14px;color:#6b7280;">Status</p>
                    <p style="margin:0;font-size:24px;color:#111827;font-weight:700;">${data.statusText || 'Updated'}</p>
                    <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">${data.verificationType || 'Document'}</p>
                  </td>
                </tr>
              </table>
              `}

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.verificationUrl || 'https://extrahand.in/settings/verification'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">
                      ${data.status === 'rejected' ? 'Resubmit Document' : 'View Verification Status'}
                    </a>
                  </td>
                </tr>
              </table>
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
${data.verificationType || 'Document'} Verification ${data.status === 'approved' ? '✅ Approved' : data.status === 'rejected' ? '⚠️ Needs Attention' : 'Update'} - ExtraHand

Hi ${data.userName || 'there'},

${data.verificationType || 'Document'} Status: ${data.status === 'approved' ? '✓ Verified' : data.status === 'rejected' ? '✗ Rejected' : data.statusText || 'Updated'}

${data.status === 'approved' ? 
  `Your ${data.verificationType || 'document'} has been verified successfully.` :
  data.status === 'rejected' ? 
  `Your ${data.verificationType || 'document'} verification was not successful.${data.rejectionReason ? `\nReason: ${data.rejectionReason}` : ''}` :
  `Your ${data.verificationType || 'document'} verification status has been updated.`
}

${data.status === 'rejected' ? 'Resubmit' : 'View status'}: ${data.verificationUrl || 'https://extrahand.in/settings/verification'}

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
