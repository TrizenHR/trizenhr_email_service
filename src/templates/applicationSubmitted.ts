import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const applicationSubmittedTemplate: EmailTemplate = {
  name: 'application_submitted',
  subject: '📝 New Application Received - ExtraHand',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Application Received</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#0F172A;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              New Application
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">New application! 📝</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">Someone wants to help with your task</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.requesterName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Great news! <strong>${data.applicantName || 'Someone'}</strong> has applied to your task.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;">
                    <p style="margin:0 0 8px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Your Task</p>
                    <h3 style="margin:0 0 16px;font-size:18px;color:#111827;">${data.taskTitle || 'Task'}</h3>
                    
                    <div style="border-top:1px solid #e5e7eb;padding-top:16px;">
                      <p style="margin:0 0 8px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Applicant</p>
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="padding:4px 0;font-size:14px;color:#6b7280;">Name:</td>
                          <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.applicantName || 'Tasker'}</td>
                        </tr>
                        ${data.applicantRating ? `
                        <tr>
                          <td style="padding:4px 0;font-size:14px;color:#6b7280;">Rating:</td>
                          <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">⭐ ${data.applicantRating}</td>
                        </tr>
                        ` : ''}
                        ${data.applicantCompletedTasks ? `
                        <tr>
                          <td style="padding:4px 0;font-size:14px;color:#6b7280;">Completed Tasks:</td>
                          <td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${data.applicantCompletedTasks}</td>
                        </tr>
                        ` : ''}
                        ${data.proposedAmount ? `
                        <tr>
                          <td style="padding:4px 0;font-size:14px;color:#6b7280;">Proposed Amount:</td>
                          <td style="padding:4px 0;font-size:14px;color:#111827;font-weight:600;text-align:right;">₹${data.proposedAmount}</td>
                        </tr>
                        ` : ''}
                      </table>
                    </div>

                    ${data.applicantMessage ? `
                    <div style="border-top:1px solid #e5e7eb;padding-top:16px;margin-top:16px;">
                      <p style="margin:0 0 8px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
                      <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;font-style:italic;">"${data.applicantMessage}"</p>
                    </div>
                    ` : ''}
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.applicationUrl || data.taskUrl || 'https://extrahand.in/my-tasks'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">Review Application</a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;color:#6b7280;font-size:14px;text-align:center;">
                Review and respond to keep things moving!
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
📝 New Application Received - ExtraHand

Hi ${data.requesterName || 'there'},

Great news! ${data.applicantName || 'Someone'} has applied to your task.

Task: ${data.taskTitle || 'Task'}

Applicant Details:
- Name: ${data.applicantName || 'Tasker'}
${data.applicantRating ? `- Rating: ⭐ ${data.applicantRating}` : ''}
${data.applicantCompletedTasks ? `- Completed Tasks: ${data.applicantCompletedTasks}` : ''}
${data.proposedAmount ? `- Proposed Amount: ₹${data.proposedAmount}` : ''}

${data.applicantMessage ? `Message: "${data.applicantMessage}"` : ''}

Review application: ${data.applicationUrl || data.taskUrl || 'https://extrahand.in/my-tasks'}

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
