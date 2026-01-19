import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const taskReminderTemplate: EmailTemplate = {
  name: 'task_reminder',
  subject: '⏰ Task Reminder: ${data.taskTitle} Tomorrow - ExtraHand',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Reminder</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#F59E0B;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Task Reminder
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Your task is tomorrow! ⏰</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">24 hours until scheduled time</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.recipientName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                This is a friendly reminder that your task is scheduled for tomorrow.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FEF3C7;border:1px solid #FCD34D;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;">
                    <h3 style="margin:0 0 16px;font-size:18px;color:#111827;">${data.taskTitle || 'Task'}</h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Date:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;font-weight:600;text-align:right;">${data.scheduledDate || 'Tomorrow'}</td>
                      </tr>
                      ${data.scheduledTime ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Time:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;font-weight:600;text-align:right;">${data.scheduledTime}</td>
                      </tr>
                      ` : ''}
                      ${data.location ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Location:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.location}</td>
                      </tr>
                      ` : ''}
                      ${data.otherPartyName ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">${data.isTasker ? 'Requester' : 'Tasker'}:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.otherPartyName}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:16px 0 10px;color:#111827;font-size:15px;font-weight:600;">Quick checklist:</p>
              <ul style="margin:0 0 22px;padding-left:20px;color:#374151;font-size:15px;line-height:1.7;">
                <li>Confirm the time and location with ${data.isTasker ? 'the requester' : 'your tasker'}</li>
                <li>Prepare any materials or tools needed</li>
                <li>Save the contact information</li>
                <li>Plan your travel route if applicable</li>
              </ul>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 10px;">
                    <a href="${data.taskUrl || 'https://extrahand.in/my-tasks'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">View Task</a>
                  </td>
                </tr>
                ${data.chatUrl ? `
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.chatUrl}" style="display:inline-block;background:#0F172A;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">Message ${data.isTasker ? 'Requester' : 'Tasker'}</a>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">This is an automated reminder.</p>
              <p style="margin:0 0 8px;font-size:13px;">
                <a href="https://extrahand.in/my-tasks" style="color:#F59E0B;text-decoration:none;">My Tasks</a> ·
                <a href="https://extrahand.in/settings/notifications" style="color:#F59E0B;text-decoration:none;">Notification Settings</a>
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
⏰ Task Reminder - ExtraHand

Hi ${data.recipientName || 'there'},

This is a friendly reminder that your task is scheduled for tomorrow!

Task: ${data.taskTitle || 'Task'}
Date: ${data.scheduledDate || 'Tomorrow'}
${data.scheduledTime ? `Time: ${data.scheduledTime}` : ''}
${data.location ? `Location: ${data.location}` : ''}
${data.otherPartyName ? `${data.isTasker ? 'Requester' : 'Tasker'}: ${data.otherPartyName}` : ''}

Quick checklist:
- Confirm the time and location
- Prepare any materials or tools needed
- Save the contact information
- Plan your travel route if applicable

View task: ${data.taskUrl || 'https://extrahand.in/my-tasks'}

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
