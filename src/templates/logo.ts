/**
 * Get ExtraHand logo as an HTML img tag for email templates.
 * Uses a publicly accessible hosted image URL for maximum compatibility.
 */
export function getLogoHTML(): string {
  // Use the hosted logo URL from imgbb.co
  const logoUrl = 'https://i.ibb.co/Zt9jNcs/logo.png';
  
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
      <tr>
        <td align="center" style="padding:0;">
          <!--[if mso]>
          <table role="presentation" width="80" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td width="80" height="80" style="width:80px;height:80px;text-align:center;">
                <img src="${logoUrl}" alt="ExtraHand Logo" width="80" height="80" style="display:block;width:80px;height:80px;border:0;" />
              </td>
            </tr>
          </table>
          <![endif]-->
          <!--[if !mso]><!-->
          <img 
            src="${logoUrl}" 
            alt="ExtraHand Logo" 
            width="80" 
            height="80" 
            style="display:block;margin:0 auto;max-width:80px;width:80px;height:80px;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"
            border="0"
            class="logo-image"
          />
          <!--<![endif]-->
        </td>
      </tr>
    </table>
  `;
} 

// Export for backward compatibility
export const EXTRAHAND_LOGO_SVG = getLogoHTML();
