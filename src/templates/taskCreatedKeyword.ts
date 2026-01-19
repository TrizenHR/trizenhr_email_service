import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const taskCreatedKeywordTemplate: EmailTemplate = {
  name: 'task_created_keyword',
  subject: '🔔 Task Alert: Matches Your Keywords - ExtraHand',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Matches Your Keywords</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#0F172A;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Keyword Alert
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Keyword match! 🔔</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">A task matches: "${data.matchedKeyword || 'your keywords'}"</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.userName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                A new task matching your saved keyword "${data.matchedKeyword || 'alert'}" has just been posted!
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;">
                    <h3 style="margin:0 0 12px;font-size:18px;color:#111827;">${data.taskTitle || 'New Task'}</h3>
                    ${data.taskDescription ? `<p style="margin:0 0 12px;color:#374151;font-size:14px;line-height:1.6;">${data.taskDescription.substring(0, 150)}${data.taskDescription.length > 150 ? '...' : ''}</p>` : ''}
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      ${data.budget ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Budget:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;font-weight:600;text-align:right;">₹${data.budget}</td>
                      </tr>
                      ` : ''}
                      ${data.location ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Location:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.location}</td>
                      </tr>
                      ` : ''}
                      ${data.scheduledDate ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Date:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.scheduledDate}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.taskUrl || 'https://extrahand.in/tasks'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">View Task</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">You're receiving this because you saved "${data.matchedKeyword || 'keyword'}" as an alert.</p>
              <p style="margin:0 0 8px;font-size:13px;">
                <a href="https://extrahand.in/settings/keywords" style="color:#F59E0B;text-decoration:none;">Manage Keywords</a> ·
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
🔔 Task Alert: Matches Your Keywords - ExtraHand

Hi ${data.userName || 'there'},

A new task matching your saved keyword "${data.matchedKeyword || 'alert'}" has just been posted!

Task: ${data.taskTitle || 'New Task'}
${data.taskDescription ? `Description: ${data.taskDescription.substring(0, 150)}${data.taskDescription.length > 150 ? '...' : ''}` : ''}
${data.budget ? `Budget: ₹${data.budget}` : ''}
${data.location ? `Location: ${data.location}` : ''}
${data.scheduledDate ? `Date: ${data.scheduledDate}` : ''}

View task: ${data.taskUrl || 'https://extrahand.in/tasks'}

Manage your keyword alerts: https://extrahand.in/settings/keywords

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
