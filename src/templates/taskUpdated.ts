import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const taskUpdatedTemplate: EmailTemplate = {
  name: 'task_updated',
  subject: '📍 Task Updated - ExtraHand',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Updated</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#0F172A;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Task Update
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Task details changed</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Please review the updates</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.recipientName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                The following task has been updated. Please review the changes.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;">
                    <h3 style="margin:0 0 16px;font-size:18px;color:#111827;">${data.taskTitle || 'Task'}</h3>
                    
                    ${data.changes && data.changes.length > 0 ? `
                    <p style="margin:0 0 12px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">What changed:</p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      ${data.changes.map((change: any) => `
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
                          <span style="font-size:14px;color:#6b7280;">${change.field}:</span>
                          ${change.oldValue ? `<span style="font-size:14px;color:#DC2626;text-decoration:line-through;margin:0 8px;">${change.oldValue}</span>` : ''}
                          <span style="font-size:14px;color:#059669;font-weight:600;">→ ${change.newValue}</span>
                        </td>
                      </tr>
                      `).join('')}
                    </table>
                    ` : `
                    <p style="margin:0;color:#374151;font-size:14px;">The task details have been modified.</p>
                    `}
                  </td>
                </tr>
              </table>

              ${data.updateNote ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FEF3C7;border:1px solid #FCD34D;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="margin:0 0 4px;font-size:12px;color:#92400E;text-transform:uppercase;">Note from requester:</p>
                    <p style="margin:0;color:#92400E;font-size:14px;line-height:1.6;">${data.updateNote}</p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.taskUrl || 'https://extrahand.in/my-tasks'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">View Updated Task</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">This is an automated email.</p>
              <p style="margin:0 0 8px;font-size:13px;">
                <a href="https://extrahand.in/my-tasks" style="color:#F59E0B;text-decoration:none;">My Tasks</a> ·
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
📍 Task Updated - ExtraHand

Hi ${data.recipientName || 'there'},

The following task has been updated:

Task: ${data.taskTitle || 'Task'}

${data.changes && data.changes.length > 0 ? 
  'What changed:\n' + data.changes.map((c: any) => `- ${c.field}: ${c.oldValue ? c.oldValue + ' → ' : ''}${c.newValue}`).join('\n')
  : 'The task details have been modified.'}

${data.updateNote ? `Note from requester: ${data.updateNote}` : ''}

View task: ${data.taskUrl || 'https://extrahand.in/my-tasks'}

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
