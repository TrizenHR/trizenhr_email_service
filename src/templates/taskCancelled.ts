import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const taskCancelledTemplate: EmailTemplate = {
  name: 'task_cancelled',
  subject: (data: any) => `Task cancelled: ${data.taskTitle || 'Task'} - ${data.platformName || 'ExtraHand'}`,

  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Cancelled</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#6b7280;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Task Cancelled
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">This task has been cancelled</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">You’re receiving this because you were involved in this task</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.recipientName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                The following task has been cancelled${data.cancelledByName ? ` by ${data.cancelledByName}` : ''}.
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;">
                    <h3 style="margin:0 0 12px;font-size:18px;color:#111827;">${data.taskTitle || 'Task'}</h3>
                    ${data.reason ? `<p style="margin:0 0 12px;font-size:14px;color:#6b7280;">Reason: ${data.reason}</p>` : ''}
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                You can browse more tasks or post a new one.
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.browseUrl || 'https://extrahand.in/tasks'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">Browse Tasks</a>
                  </td>
                </tr>
              </table>
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
Task cancelled - ${data.platformName || 'ExtraHand'}

Hi ${data.recipientName || 'there'},

The following task has been cancelled${data.cancelledByName ? ` by ${data.cancelledByName}` : ''}.

Task: ${data.taskTitle || 'Task'}
${data.reason ? `Reason: ${data.reason}` : ''}

You can browse more tasks or post a new one: ${data.browseUrl || 'https://extrahand.in/tasks'}

© ${new Date().getFullYear()} ${data.platformName || 'ExtraHand'}. All rights reserved.
  `
};
