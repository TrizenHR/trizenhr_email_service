import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const taskAssignedRequesterTemplate: EmailTemplate = {
  name: 'task_assigned_requester',
  subject: (data: any) => `👤 Someone has been assigned to your task - ${data.platformName || 'ExtraHand'}`,

  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Assigned</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#059669;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Task Assigned
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Your task has been assigned 👤</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">${data.assigneeName || 'A tasker'} is now assigned to your task</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.requesterName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Great news! You accepted an application and <strong>${data.assigneeName || 'your tasker'}</strong> is now assigned to your task.
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;">
                    <h3 style="margin:0 0 12px;font-size:18px;color:#111827;">${data.taskTitle || 'Task'}</h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Assigned to:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;font-weight:600;text-align:right;">${data.assigneeName || 'Tasker'}</td>
                      </tr>
                      ${data.budget ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Agreed amount:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">₹${data.budget}</td>
                      </tr>
                      ` : ''}
                      ${data.scheduledDate ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Scheduled:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.scheduledDate}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 10px;color:#111827;font-size:15px;font-weight:600;">What’s next?</p>
              <ul style="margin:0 0 18px;padding-left:20px;color:#374151;font-size:15px;line-height:1.7;">
                <li>Chat with your tasker to confirm details</li>
                <li>They’ll mark the task as started when they begin</li>
                <li>After completion, you can approve and leave a review</li>
              </ul>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.taskUrl || data.chatUrl || 'https://extrahand.in/my-tasks'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">View Task & Chat</a>
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
Someone has been assigned to your task - ${data.platformName || 'ExtraHand'}

Hi ${data.requesterName || 'there'},

You accepted an application. ${data.assigneeName || 'Your tasker'} is now assigned to your task.

Task: ${data.taskTitle || 'Task'}
Assigned to: ${data.assigneeName || 'Tasker'}
${data.budget ? `Agreed amount: ₹${data.budget}` : ''}
${data.scheduledDate ? `Scheduled: ${data.scheduledDate}` : ''}

What’s next? Chat with your tasker, they’ll mark the task started, then you can approve and review after completion.

View task: ${data.taskUrl || data.chatUrl || 'https://extrahand.in/my-tasks'}

© ${new Date().getFullYear()} ${data.platformName || 'ExtraHand'}. All rights reserved.
  `
};
