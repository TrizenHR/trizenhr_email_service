import { EmailTemplate } from '../types';

export interface OrganizationCreatedSupportTemplateData {
  organizationName: string;
  companyAdminEmail: string;
  companyAdminName?: string;
  createdByName?: string;
  createdByEmail?: string;
  createdAt?: Date;
  platformName?: string;
}

export const organizationCreatedSupportTemplate: EmailTemplate = {
  name: 'organization_created_support',
  subject: (data: OrganizationCreatedSupportTemplateData) =>
    `New Organization Created: ${data.organizationName}`,

  html: (data: OrganizationCreatedSupportTemplateData) => {
    const createdAt = new Date(data.createdAt || new Date()).toLocaleString('en-US');
    const platformName = data.platformName || 'TrizenHR';

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Organization Created</title>
</head>
<body style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="padding:16px 20px;background:#0f172a;color:#ffffff;font-size:14px;font-weight:600;">
              ${platformName} System Notification
            </td>
          </tr>
          <tr>
            <td style="padding:24px 20px;">
              <h2 style="margin:0 0 16px;font-size:22px;color:#0f172a;">New organization created</h2>
              <p style="margin:0 0 14px;font-size:14px;line-height:22px;color:#334155;">
                A new organization has been onboarded in ${platformName}.
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:8px 0;color:#64748b;font-size:13px;width:180px;">Organization</td>
                  <td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:600;">${data.organizationName}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#64748b;font-size:13px;">Company Admin</td>
                  <td style="padding:8px 0;color:#0f172a;font-size:14px;">${data.companyAdminName ? `${data.companyAdminName} (${data.companyAdminEmail})` : data.companyAdminEmail}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#64748b;font-size:13px;">Created By</td>
                  <td style="padding:8px 0;color:#0f172a;font-size:14px;">${data.createdByName || 'System Admin'}${data.createdByEmail ? ` (${data.createdByEmail})` : ''}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#64748b;font-size:13px;">Created At</td>
                  <td style="padding:8px 0;color:#0f172a;font-size:14px;">${createdAt}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  },

  text: (data: OrganizationCreatedSupportTemplateData) => {
    const createdAt = new Date(data.createdAt || new Date()).toLocaleString('en-US');
    const platformName = data.platformName || 'TrizenHR';

    return `
${platformName} SYSTEM NOTIFICATION

New organization created.

Organization: ${data.organizationName}
Company Admin: ${data.companyAdminName ? `${data.companyAdminName} (${data.companyAdminEmail})` : data.companyAdminEmail}
Created By: ${data.createdByName || 'System Admin'}${data.createdByEmail ? ` (${data.createdByEmail})` : ''}
Created At: ${createdAt}
`;
  },
};
