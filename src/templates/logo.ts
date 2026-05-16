/**
 * Get ExtraHand logo as an HTML img tag for email templates.
 * Uses CID (Content-ID) reference for inline attachment - bulletproof for Outlook.
 * The logo must be attached with cid: 'extrahand-logo' in the email attachments.
 */
export function getLogoHTML(): string {
  return '';
} 

// Export for backward compatibility
export const EXTRAHAND_LOGO_SVG = getLogoHTML();
