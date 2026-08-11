import { EmailTemplate } from '../types';

export interface TrizenDemoInviteTemplateData {
  role: string;
  inviteLink: string;
  inviteExpiresAt: Date;
  demoAccessTtlDays: number;
  companyName: string;
  platformName?: string;
  name?: string;
  inviterName?: string;
}

const ROLE_LABEL_MAP: Record<string, string> = {
  company_admin: 'Company Admin',
  admin: 'Company Admin',
  hr_admin: 'HR Admin',
  hr: 'HR Admin',
  manager: 'Manager',
  supervisor: 'Manager',
  employee: 'Employee',
};

function roleLabel(role: string): string {
  const normalized = (role || '').trim().toLowerCase().replace(/\s+/g, '_');
  return ROLE_LABEL_MAP[normalized] || role;
}

function formatDateTime(date: Date): string {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

export const trizenDemoInviteTemplate: EmailTemplate = {
  name: 'trizen_demo_invite',
  subject: (data: TrizenDemoInviteTemplateData) =>
    `${data.companyName} — Try Trizen HR (${roleLabel(data.role)} demo)`,

  html: (data: TrizenDemoInviteTemplateData) => {
    const label = roleLabel(data.role);
    const inviteExpiry = formatDateTime(new Date(data.inviteExpiresAt));
    const platformName = data.platformName || 'TrizenHR';

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Trizen HR Demo Invitation</title>
</head>
<body style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table role="presentation" width="620" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
          <tr>
            <td style="padding:32px 32px 24px;">
              <div style="margin:0 0 24px;padding:16px 20px;background:#eff6ff;border-radius:8px;border-left:4px solid #2563eb;">
                <p style="margin:0 0 4px;font-size:12px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#64748b;">Demo invitation</p>
                <p style="margin:0;font-size:22px;font-weight:700;color:#0f172a;line-height:1.3;">${data.companyName}</p>
              </div>

              <h2 style="margin:0 0 16px;font-size:24px;color:#0f172a;font-weight:700;">You're invited to try ${platformName}</h2>
              <p style="margin:0 0 16px;font-size:16px;line-height:24px;color:#334155;">
                Hello ${data.name || 'there'},
              </p>
              <p style="margin:0 0 16px;font-size:16px;line-height:24px;color:#334155;">
                ${data.inviterName || 'The Trizen HR team'} has invited you to explore Trizen HR as a <strong>${label}</strong> in a dedicated demo environment for <strong>${data.companyName}</strong>.
              </p>

              <p style="margin:0 0 16px;font-size:16px;line-height:24px;color:#334155;">
                Click below to accept the invitation and create your password. After accepting, you'll have <strong>${data.demoAccessTtlDays} days</strong> of demo access.
              </p>

              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:24px 0;">
                <tr>
                  <td style="border-radius:6px;background:#2563eb;">
                    <a href="${data.inviteLink}" style="display:inline-block;padding:14px 28px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;">
                      Accept Demo Invitation
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;font-size:12px;color:#64748b;word-break:break-all;">
                Or copy and paste this link into your browser:<br/>
                <span style="color:#0f172a;">${data.inviteLink}</span>
              </p>

              <p style="margin:24px 0 8px;font-size:14px;color:#64748b;">
                This invitation link expires on <strong>${inviteExpiry}</strong>.
              </p>
              <p style="margin:0;font-size:13px;color:#94a3b8;border-top:1px solid #f1f5f9;padding-top:16px;">
                Powered by <strong>TrizenHR</strong>
              </p>
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

  text: (data: TrizenDemoInviteTemplateData) => {
    const label = roleLabel(data.role);
    const inviteExpiry = formatDateTime(new Date(data.inviteExpiresAt));
    const platformName = data.platformName || 'TrizenHR';

    return `
You're invited to try ${platformName}

Hello ${data.name || 'there'},

${data.inviterName || 'The Trizen HR team'} has invited you to explore Trizen HR as a ${label} in a demo environment for ${data.companyName}.

Accept Demo Invitation: ${data.inviteLink}

After accepting, you'll have ${data.demoAccessTtlDays} days of demo access.
This invitation link expires on ${inviteExpiry}.
    `.trim();
  },
};
