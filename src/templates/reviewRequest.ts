import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const reviewRequestTemplate: EmailTemplate = {
  name: 'review_request',
  subject: '⭐ Please Leave a Review - ExtraHand',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Please Leave a Review</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#0F172A;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Review Request
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">How was your experience? ⭐</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Your feedback helps the community</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.reviewerName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                You recently completed a task with <strong>${data.revieweeName || 'a user'}</strong>. We'd love to hear about your experience!
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;">
                    <h3 style="margin:0 0 12px;font-size:18px;color:#111827;">${data.taskTitle || 'Completed Task'}</h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">${data.isRequester ? 'Tasker' : 'Requester'}:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.revieweeName || 'User'}</td>
                      </tr>
                      ${data.completedDate ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Completed:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.completedDate}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;text-align:center;">
                Your review helps ${data.revieweeName || 'them'} build their reputation and helps others make informed decisions.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.reviewUrl || 'https://extrahand.in/my-tasks'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">Write a Review</a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;color:#6b7280;font-size:14px;text-align:center;">
                It only takes a minute!
              </p>
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
⭐ Please Leave a Review - ExtraHand

Hi ${data.reviewerName || 'there'},

You recently completed a task with ${data.revieweeName || 'a user'}. We'd love to hear about your experience!

Task: ${data.taskTitle || 'Completed Task'}
${data.isRequester ? 'Tasker' : 'Requester'}: ${data.revieweeName || 'User'}
${data.completedDate ? `Completed: ${data.completedDate}` : ''}

Your review helps ${data.revieweeName || 'them'} build their reputation and helps others make informed decisions.

Write a review: ${data.reviewUrl || 'https://extrahand.in/my-tasks'}

It only takes a minute!

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
