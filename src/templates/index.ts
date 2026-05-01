import { EmailTemplate } from '../types';

// TrizenHR Templates
import { passwordResetTemplate } from './passwordReset';
import { organizationCreatedSupportTemplate } from './organizationCreatedSupport';
import { trizenRoleInviteTemplate } from './trizenRoleInvite';

export const templates: Record<string, EmailTemplate> = {
  password_reset: passwordResetTemplate,
  organization_created_support: organizationCreatedSupportTemplate,
  trizen_role_invite: trizenRoleInviteTemplate,
};

export function getTemplate(name: string): EmailTemplate | undefined {
  return templates[name];
}
