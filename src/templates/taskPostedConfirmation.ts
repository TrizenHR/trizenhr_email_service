import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const taskPostedConfirmationTemplate: EmailTemplate = {
  name: 'task_posted_confirmation',
  subject: (data: any) => `✅ Your task "${data.taskTitle || 'Task'}" has been posted - ${data.platformName || 'ExtraHand'}`,

  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Posted Successfully</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#059669;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Task Posted
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Your task is live! ✅</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Applicants can now view and apply</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.requesterName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Your task has been posted successfully. Here’s a quick summary:
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ECFDF5;border:1px solid #6EE7B7;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;">
                    <h3 style="margin:0 0 16px;font-size:18px;color:#111827;">${data.taskTitle || 'Task'}</h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      ${data.budget ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Budget:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;font-weight:600;text-align:right;">₹${data.budget}</td>
                      </tr>
                      ` : ''}
                      ${data.category ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Category:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.category}</td>
                      </tr>
                      ` : ''}
                      ${data.location ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Location:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.location}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.taskUrl || 'https://extrahand.in/my-tasks'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">View Task</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;color:#6b7280;font-size:14px;text-align:center;">
                You’ll get an email when someone applies.
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
Your task has been posted - ${data.platformName || 'ExtraHand'}

Hi ${data.requesterName || 'there'},

Your task has been posted successfully.

Task: ${data.taskTitle || 'Task'}
${data.budget ? `Budget: ₹${data.budget}` : ''}
${data.category ? `Category: ${data.category}` : ''}
${data.location ? `Location: ${data.location}` : ''}

View task: ${data.taskUrl || 'https://extrahand.in/my-tasks'}

You’ll get an email when someone applies.

© ${new Date().getFullYear()} ${data.platformName || 'ExtraHand'}. All rights reserved.
  `
};
