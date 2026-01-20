import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const taskCompletedTemplate: EmailTemplate = {
  name: 'task_completed',
  subject: '✅ Task Completed Successfully - ExtraHand',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Completed</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#059669;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Task Completed
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Task completed! ✅</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Great job on finishing this task</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.recipientName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                ${data.isTasker 
                  ? `The requester has confirmed that you've completed the task. Well done!`
                  : `You've confirmed the task completion. Thank you for using ExtraHand!`
                }
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ECFDF5;border:1px solid #6EE7B7;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;">
                    <h3 style="margin:0 0 16px;font-size:18px;color:#111827;">${data.taskTitle || 'Task'}</h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Status:</td>
                        <td style="padding:4px 0;font-size:14px;color:#059669;font-weight:700;text-align:right;">Completed ✓</td>
                      </tr>
                      ${data.completedDate ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">Completed On:</td>
                        <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.completedDate}</td>
                      </tr>
                      ` : ''}
                      ${data.amount ? `
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#6b7280;">${data.isTasker ? 'Earned' : 'Paid'}:</td>
                        <td style="padding:4px 0;font-size:14px;color:#059669;font-weight:700;text-align:right;">₹${data.amount}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              ${data.isTasker ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;">
                      💰 Your payment will be processed and transferred to your bank account ${data.payoutInfo || 'within the standard processing time'}.
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FEF3C7;border:1px solid #FCD34D;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="margin:0;color:#92400E;font-size:14px;line-height:1.6;">
                      ⭐ <strong>Don't forget to leave a review!</strong> Your feedback helps the community.
                    </p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.reviewUrl || data.taskUrl || 'https://extrahand.in/my-tasks'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">Leave a Review</a>
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
✅ Task Completed Successfully - ExtraHand

Hi ${data.recipientName || 'there'},

${data.isTasker 
  ? `The requester has confirmed that you've completed the task. Well done!`
  : `You've confirmed the task completion. Thank you for using ExtraHand!`
}

Task: ${data.taskTitle || 'Task'}
Status: Completed ✓
${data.completedDate ? `Completed On: ${data.completedDate}` : ''}
${data.amount ? `${data.isTasker ? 'Earned' : 'Paid'}: ₹${data.amount}` : ''}

${data.isTasker ? `Your payment will be processed and transferred to your bank account ${data.payoutInfo || 'within the standard processing time'}.` : ''}

Don't forget to leave a review! Your feedback helps the community.

Leave a review: ${data.reviewUrl || data.taskUrl || 'https://extrahand.in/my-tasks'}

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
