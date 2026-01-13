/**
 * Get ExtraHand logo as an HTML img tag for email templates.
 * Email clients have poor SVG support, so we use a hosted PNG image.
 * The logo is served from the API service at /images-logo/logo.png
 */
function getLogoHTML(): string {
  // Use LOGO_URL from environment if provided, otherwise use the default hosted URL
  // The default URL is from the API service which serves the logo from S3
  // Note: If using signed URLs, set LOGO_URL in environment variables
  const logoUrl = process.env.LOGO_URL || 
    'https://tasker-onboarding-platform-api.apps.extrahand.in/images-logo/logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=KISCFBS81F5PWL7DLXXL%2F20260113%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260113T093051Z&X-Amz-Expires=604800&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJLSVNDRkJTODFGNVBXTDdETFhYTCIsImV4cCI6MTc2ODMzODU2NCwicGFyZW50IjoiZDJlYTRkMGFhY2Y2ZTdhMjE0Nzg1MTViIn0.yxb2pf13Ckt48cCzn_2_Nmp4jmbK78cS7wpTFUjxn-KlIaBakZw5k5SXrE8B1JwtphAlBZI-ybtK1ahlrMQ9pQ&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=b3cf505d07153a56678a6c8f56f489c37b59ba5a1d48fe8c05a29d402a53a779';

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
            style="display:block;margin:0 auto;max-width:80px;height:auto;border:0;outline:none;text-decoration:none;"
            border="0"
          />
        </td>
      </tr>
    </table>
  `;
}

// Export the logo HTML (img tag for email compatibility)
export const EXTRAHAND_LOGO_SVG = getLogoHTML();
