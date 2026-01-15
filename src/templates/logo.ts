/**
 * Get ExtraHand logo as an HTML img tag for email templates.
 * Email clients have poor SVG support, so we use a hosted PNG image.
 * The logo is served from the API service at /images-logo/logo.png
 */
function getLogoHTML(): string {
  // Use LOGO_URL from environment if provided, otherwise use the default hosted URL
  // The default URL is from the API service which serves the logo from S3
  // Note: Set LOGO_URL in environment variables to use a custom logo URL
  const logoUrl = process.env.LOGO_URL || 
    'https://drive.google.com/file/d/1FvCJTDBZE0bMHWKbHDOBjtclMDwQ0oFK/view?usp=sharing';
    

  // Return img tag with proper email-safe attributes
  // Using table-based layout for maximum email client compatibility
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center" style="padding:0;">
          <img 
            src="${logoUrl}" 
            alt="ExtraHand Logo" 
            width="80" 
            height="80" 
            style="display:block;margin:0 auto;max-width:80px;width:100%;height:auto;border:0;outline:none;text-decoration:none;"
            border="0"
            class="logo-image"
          />
        </td>
      </tr>
    </table>
  `;
}

// Export the logo HTML (img tag for email compatibility)
export const EXTRAHAND_LOGO_SVG = getLogoHTML();
