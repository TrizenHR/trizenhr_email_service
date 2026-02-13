import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const completionProofSubmittedTemplate: EmailTemplate = {
  name: 'completion_proof_submitted',
  subject: (data: any) => `📎 Completion proof submitted for "${data.taskTitle || 'Task'}" - ${data.platformName || 'ExtraHand'}`,

  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Completion Proof Submitted</title>
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
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Completion proof submitted 📎</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Please review and approve</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.requesterName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                <strong>${data.assigneeName || 'Your tasker'}</strong> has submitted completion proof for your task. Please review it and approve or request changes.
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FFFBEB;border:1px solid #FCD34D;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;">
                    <h3 style="margin:0 0 12px;font-size:18px;color:#111827;">${data.taskTitle || 'Task'}</h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Tasker:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.assigneeName || 'Tasker'}</td>
                      </tr>
                      ${data.submittedAt ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Submitted:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.submittedAt}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.taskUrl || 'https://extrahand.in/my-tasks'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">Review & Approve</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;color:#6b7280;font-size:14px;text-align:center;">
                Once you approve, the task will be marked complete and payment can be released.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;">This is an automated email.</p>
              <p style="margin:0;color:#9ca3af;font-size:12px;">© ${new Date().getFullYear()} ${data.platformName || 'ExtraHand'}. All rights reserved.</p>
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
Completion proof submitted - ${data.platformName || 'ExtraHand'}

Hi ${data.requesterName || 'there'},

${data.assigneeName || 'Your tasker'} has submitted completion proof for your task. Please review and approve or request changes.

Task: ${data.taskTitle || 'Task'}
Tasker: ${data.assigneeName || 'Tasker'}
${data.submittedAt ? `Submitted: ${data.submittedAt}` : ''}

Review & approve: ${data.taskUrl || 'https://extrahand.in/my-tasks'}

Once you approve, the task will be marked complete and payment can be released.

© ${new Date().getFullYear()} ${data.platformName || 'ExtraHand'}. All rights reserved.
  `
};
