import { EmailTemplate } from '../types';

export interface TrizenRoleInviteTemplateData {
  role: string;
  inviteLink: string;
  expiresAt: Date;
  platformName?: string;
  organizationName?: string;
  name?: string;
  inviterName?: string;
}

const ROLE_LABEL_MAP: Record<string, string> = {
  company_admin: 'Company Admin',
  hr_admin: 'HR Admin',
  manager: 'Manager',
  employee: 'Employee',
};

function normalizeRole(role: string): string {
  return (role || '').trim().toLowerCase().replace(/\s+/g, '_');
}

function roleLabel(role: string): string {
  const normalized = normalizeRole(role);
  return ROLE_LABEL_MAP[normalized] || role;
}

function roleCapabilities(role: string): string[] {
  const normalized = normalizeRole(role);

  if (normalized === 'company_admin') {
    return [
      'Create your password securely from the invitation link.',
      'Invite and manage HR Admin users.',
      'Configure core company workspace settings.',
    ];
  }

  if (normalized === 'hr_admin') {
    return [
      'Invite Managers and Employees.',
      'Manage employee lifecycle and HR operations.',
      'Coordinate attendance and holiday policy communication.',
    ];
  }

  if (normalized === 'manager') {
    return [
      'Access team analytics and insights.',
      'Review employee login and team activity information.',
      'Coordinate day-to-day operational follow-up.',
    ];
  }

  if (normalized === 'employee') {
    return [
      'Mark daily attendance.',
      'Check holiday calendar and company announcements.',
      'Use your portal access for routine HR tasks.',
    ];
  }

  return [
    'Access your assigned workspace and permissions.',
  ];
}

export const trizenRoleInviteTemplate: EmailTemplate = {
  name: 'trizen_role_invite',
  subject: (data: TrizenRoleInviteTemplateData) => {
    const platformName = data.platformName || 'TrizenHR';
    return `${platformName} Invitation - ${roleLabel(data.role)}`;
  },

  html: (data: TrizenRoleInviteTemplateData) => {
    const platformName = data.platformName || 'TrizenHR';
    const label = roleLabel(data.role);
    const expiryDate = new Date(data.expiresAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const capabilities = roleCapabilities(data.role)
      .map((item) => `<li style="margin:0 0 8px;">${item}</li>`)
      .join('');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${platformName} Role Invitation</title>
</head>
<body style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table role="presentation" width="620" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
          <tr>
            <td style="padding:14px 20px;background:#0f172a;color:#ffffff;font-size:14px;font-weight:600;">
              ${platformName}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 20px;">
              <h2 style="margin:0 0 12px;font-size:24px;color:#0f172a;">You're invited as ${label}</h2>
              <p style="margin:0 0 14px;font-size:14px;line-height:22px;color:#334155;">
                ${data.name ? `Hello ${data.name},` : 'Hello,'}
              </p>
              <p style="margin:0 0 14px;font-size:14px;line-height:22px;color:#334155;">
                You have been invited to join ${platformName}${data.organizationName ? ` for ${data.organizationName}` : ''} as <strong>${label}</strong>.
              </p>
              <p style="margin:0 0 10px;font-size:14px;line-height:22px;color:#334155;">What you can do:</p>
              <ul style="margin:0 0 18px 18px;padding:0;color:#334155;font-size:14px;line-height:22px;">
                ${capabilities}
              </ul>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:12px 0 16px;">
                <tr>
                  <td style="border-radius:6px;background:#f59e0b;">
                    <a href="${data.inviteLink}" style="display:inline-block;padding:12px 20px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                      Accept Invitation
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px;font-size:12px;color:#64748b;">This invitation expires on ${expiryDate}.</p>
              <p style="margin:0 0 6px;font-size:12px;color:#64748b;word-break:break-all;">${data.inviteLink}</p>
              ${data.inviterName ? `<p style="margin:10px 0 0;font-size:12px;color:#94a3b8;">Invited by ${data.inviterName}</p>` : ''}
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

  text: (data: TrizenRoleInviteTemplateData) => {
    const platformName = data.platformName || 'TrizenHR';
    const label = roleLabel(data.role);
    const expiryDate = new Date(data.expiresAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const capabilities = roleCapabilities(data.role).map((item) => `- ${item}`).join('\n');

    return `
${platformName} ROLE INVITATION

${data.name ? `Hello ${data.name},` : 'Hello,'}

You have been invited${data.organizationName ? ` to ${data.organizationName}` : ''} as ${label}.

What you can do:
${capabilities}

Accept invitation: ${data.inviteLink}
Expires on: ${expiryDate}
${data.inviterName ? `Invited by: ${data.inviterName}` : ''}
`;
  },
};
