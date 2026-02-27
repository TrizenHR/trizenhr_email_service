import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const verificationConfirmedTemplate: EmailTemplate = {
    name: 'verification_confirmed',
    subject: (data: any) => `✅ ${data.verificationType || 'Verification'} Confirmed - ExtraHand`,

    html: (data: any) => {
        // Determine verification type details
        const getVerificationDetails = () => {
            const type = data.verificationType?.toLowerCase() || '';

            if (type.includes('aadhaar') || type.includes('aadhar')) {
                return {
                    icon: '🆔',
                    title: 'Aadhaar Verified',
                    description: 'Your Aadhaar verification is complete',
                    maskedValue: data.maskedValue || 'XXXX XXXX XXXX',
                    benefits: [
                        'Enhanced profile credibility',
                        'Access to verified-only tasks',
                        'Faster payment processing',
                        'Increased trust from clients'
                    ]
                };
            } else if (type.includes('phone') || type.includes('mobile')) {
                return {
                    icon: '📱',
                    title: 'Phone Number Verified',
                    description: 'Your phone number has been verified',
                    maskedValue: data.maskedValue || data.phoneNumber || 'XXXXXX3210',
                    benefits: [
                        'Receive SMS notifications',
                        'Two-factor authentication enabled',
                        'Direct contact from clients',
                        'Improved account security'
                    ]
                };
            } else if (type.includes('email')) {
                return {
                    icon: '📧',
                    title: 'Email Address Verified',
                    description: 'Your email address has been verified',
                    maskedValue: data.maskedValue || data.email || 'verified',
                    benefits: [
                        'Receive important notifications',
                        'Password recovery enabled',
                        'Task updates and alerts',
                        'Account security enhanced'
                    ]
                };
            } else if (type.includes('pan')) {
                return {
                    icon: '💳',
                    title: 'PAN Card Verified',
                    description: 'Your PAN card verification is complete',
                    maskedValue: data.maskedValue || 'ABXXX234D',
                    benefits: [
                        'Receive payments above ₹50,000',
                        'Tax compliance enabled',
                        'Professional profile status',
                        'Access to premium tasks'
                    ]
                };
            } else if (type.includes('bank')) {
                return {
                    icon: '🏦',
                    title: 'Bank Account Verified',
                    description: 'Your bank account has been verified',
                    maskedValue: data.maskedValue || 'XXXX XXXX 1234',
                    benefits: [
                        'Direct payment transfers',
                        'Faster withdrawal processing',
                        'Secure payment gateway',
                        'Automatic payment reconciliation'
                    ]
                };
            } else {
                return {
                    icon: '✅',
                    title: `${data.verificationType || 'Verification'} Complete`,
                    description: 'Your verification has been completed successfully',
                    maskedValue: data.maskedValue || 'Verified',
                    benefits: [
                        'Enhanced profile credibility',
                        'Access to more features',
                        'Improved trust rating',
                        'Better task opportunities'
                    ]
                };
            }
        };

        const details = getVerificationDetails();
        const verifiedDate = data.verifiedDate || new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${details.title}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:linear-gradient(135deg, #059669 0%, #047857 100%);color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Verification Confirmed
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <div style="font-size:48px;margin-bottom:12px;">${details.icon}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">${details.title}</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">${details.description}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.userName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Great news! Your <strong>${data.verificationType || 'verification'}</strong> has been successfully confirmed on <strong>${verifiedDate}</strong>.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ECFDF5;border:1px solid #6EE7B7;border-radius:8px;margin:0 0 24px;">
                <tr>
                  <td style="padding:20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom:12px;">
                          <p style="margin:0;font-size:13px;color:#059669;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Verification Details</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-top:1px solid #A7F3D0;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="color:#6b7280;font-size:14px;padding:4px 0;">Type:</td>
                              <td style="color:#111827;font-size:14px;font-weight:600;text-align:right;padding:4px 0;">${data.verificationType || 'Verified'}</td>
                            </tr>
                            ${details.maskedValue ? `
                            <tr>
                              <td style="color:#6b7280;font-size:14px;padding:4px 0;">Value:</td>
                              <td style="color:#111827;font-size:14px;font-weight:600;text-align:right;padding:4px 0;">${details.maskedValue}</td>
                            </tr>
                            ` : ''}
                            <tr>
                              <td style="color:#6b7280;font-size:14px;padding:4px 0;">Verified On:</td>
                              <td style="color:#111827;font-size:14px;font-weight:600;text-align:right;padding:4px 0;">${verifiedDate}</td>
                            </tr>
                            <tr>
                              <td style="color:#6b7280;font-size:14px;padding:4px 0;">Status:</td>
                              <td style="color:#059669;font-size:14px;font-weight:700;text-align:right;padding:4px 0;">✓ Verified</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:16px 0 10px;color:#111827;font-size:15px;font-weight:600;">What this means for you:</p>
              <ul style="margin:0 0 22px;padding-left:20px;color:#374151;font-size:15px;line-height:1.7;">
                ${details.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
              </ul>

              ${data.nextSteps ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FEF3C7;border:1px solid #FCD34D;border-radius:8px;margin:0 0 20px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="margin:0 0 8px;font-size:14px;color:#92400E;font-weight:600;">💡 Next Steps</p>
                    <p style="margin:0;font-size:14px;color:#78350F;line-height:1.6;">${data.nextSteps}</p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.profileUrl || 'https://extrahand.in/profile'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">View My Profile</a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;text-align:center;">
                Continue building your profile to unlock more opportunities!
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">This is an automated confirmation email.</p>
              <p style="margin:0 0 8px;font-size:13px;">
                <a href="https://extrahand.in/profile/verify" style="color:#F59E0B;text-decoration:none;">Manage Verifications</a> ·
                <a href="https://extrhand-support-frontend.apps.extrahand.in" style="color:#F59E0B;text-decoration:none;">Help Center</a>
              </p>
              <p style="margin:0;color:#9ca3af;font-size:12px;">© ${new Date().getFullYear()} ExtraHand. All rights reserved.</p>
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

    text: (data: any) => {
        const verifiedDate = data.verifiedDate || new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        return `
✅ ${data.verificationType || 'Verification'} Confirmed - ExtraHand

Hi ${data.userName || 'there'},

Great news! Your ${data.verificationType || 'verification'} has been successfully confirmed on ${verifiedDate}.

Verification Details:
- Type: ${data.verificationType || 'Verified'}
${data.maskedValue ? `- Value: ${data.maskedValue}` : ''}
- Verified On: ${verifiedDate}
- Status: ✓ Verified

${data.nextSteps ? `Next Steps:\n${data.nextSteps}\n` : ''}

View your profile: ${data.profileUrl || 'https://extrahand.in/profile'}

Continue building your profile to unlock more opportunities!

This is an automated confirmation email.
© ${new Date().getFullYear()} ExtraHand. All rights reserved.
    `;
    }
};
