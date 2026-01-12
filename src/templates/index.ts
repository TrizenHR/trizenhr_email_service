import { EmailTemplate } from '../types';
import { accountCreatedTemplate } from './accountCreated';
import { adminInviteTemplate } from './adminInvite';
import { passwordResetTemplate } from './passwordReset';

export const templates: Record<string, EmailTemplate> = {
  account_created: accountCreatedTemplate,
  admin_invite: adminInviteTemplate,
  password_reset: passwordResetTemplate,
};

export function getTemplate(name: string): EmailTemplate | undefined {
  return templates[name];
}
