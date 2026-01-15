/**
 * Get ExtraHand logo as an HTML img tag for email templates.
 * Uses CID (Content-ID) reference for inline attachment - bulletproof for Outlook.
 * The logo must be attached with cid: 'extrahand-logo' in the email attachments.
 */
export function getLogoHTML(): string {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
      <tr>
        <td align="center" style="padding:0;">
          <!--[if mso]>
          <table role="presentation" width="80" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td width="80" height="80" style="width:80px;height:80px;text-align:center;">
                <img src="cid:extrahand-logo" alt="ExtraHand Logo" width="80" height="80" style="display:block;width:80px;height:80px;border:0;" />
              </td>
            </tr>
          </table>
          <![endif]-->
          <!--[if !mso]><!-->
          <img 
            src="cid:extrahand-logo" 
            alt="ExtraHand Logo" 
            width="80" 
            height="80" 
            style="display:block;margin:0 auto;max-width:80px;width:80px;height:80px;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"
            border="0"
          />
          <!--<![endif]-->
        </td>
      </tr>
    </table>
  `;
} 

// Export for backward compatibility
export const EXTRAHAND_LOGO_SVG = getLogoHTML();
