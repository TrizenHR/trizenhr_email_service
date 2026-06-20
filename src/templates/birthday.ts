import { EmailTemplate } from '../types';

export interface BirthdayTemplateData {
  name?: string;
  organizationName?: string;
  platformName?: string;
}

export const birthdayTemplate: EmailTemplate = {
  name: 'birthday',
  subject: (data: BirthdayTemplateData) => {
    const platformName = data.platformName || 'TrizenHR';
    return `Happy Birthday from ${data.organizationName || platformName}!`;
  },

  html: (data: BirthdayTemplateData) => {
    const platformName = data.platformName || 'TrizenHR';
    const orgLabel = data.organizationName || platformName;
    const recipient = data.name || 'there';

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Happy Birthday</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#6366F1,#8B5CF6);color:#fff;padding:28px 24px;text-align:center;">
              <div style="font-size:42px;line-height:1;margin-bottom:8px;">🎂</div>
              <h1 style="margin:0;font-size:26px;font-weight:700;">Happy Birthday!</h1>
              <p style="margin:10px 0 0;font-size:14px;opacity:0.92;">A special message from ${orgLabel}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
                Dear ${recipient},
              </p>
              <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
                On behalf of everyone at <strong>${orgLabel}</strong>, we wish you a wonderful birthday filled with joy, success, and great moments.
              </p>
              <p style="margin:0;color:#374151;font-size:16px;line-height:1.6;">
                Thank you for being part of our team. Have an amazing day!
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px;">
              <div style="background:#F5F3FF;border:1px solid #E9E5FF;border-radius:8px;padding:14px 16px;text-align:center;color:#4338CA;font-size:14px;font-weight:600;">
                Warm wishes from ${platformName}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  },

  text: (data: BirthdayTemplateData) => {
    const platformName = data.platformName || 'TrizenHR';
    const orgLabel = data.organizationName || platformName;
    const recipient = data.name || 'there';

    return `Happy Birthday, ${recipient}!

On behalf of everyone at ${orgLabel}, we wish you a wonderful birthday filled with joy, success, and great moments.

Thank you for being part of our team. Have an amazing day!

Warm wishes from ${platformName}`;
  },
};
