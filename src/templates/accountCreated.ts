import { EmailTemplate } from '../types';

export const accountCreatedTemplate: EmailTemplate = {
  name: 'account_created',
  subject: 'Your ExtraHand Account is Ready!',
  
  html: (data: any) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6; 
          color: #333; 
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: white;
        }
        .header { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px; 
          text-align: center; 
        }
        .header h1 {
          color: white;
          margin: 0;
          font-size: 28px;
        }
        .content { 
          padding: 40px 30px; 
        }
        .button { 
          display: inline-block; 
          padding: 14px 32px; 
          background: #667eea;
          color: white !important; 
          text-decoration: none; 
          border-radius: 6px; 
          margin: 20px 0;
          font-weight: 600;
        }
        .info-box {
          background: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 15px;
          margin: 20px 0;
        }
        .footer { 
          text-align: center; 
          padding: 30px 20px; 
          color: #666; 
          font-size: 14px;
          background: #f8f9fa;
        }
        .footer a {
          color: #667eea;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to ExtraHand!</h1>
        </div>
        <div class="content">
          <p>Hello <strong>${data.name}</strong>,</p>
          
          <p>Your account has been successfully created on ExtraHand! We're excited to have you join our community of skilled taskers.</p>
          
          ${data.phone ? `
          <div class="info-box">
            <strong>📱 Your Phone Number:</strong> ${data.phone}
          </div>
          ` : ''}
          
          <p>You can now:</p>
          <ul>
            <li>Browse and apply for tasks in your area</li>
            <li>Build your profile and showcase your skills</li>
            <li>Start earning money by completing tasks</li>
            <li>Get verified to unlock more opportunities</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.loginUrl}" class="button">Login to Your Account</a>
          </div>
          
          <p><strong>Next Steps:</strong></p>
          <ol>
            <li>Complete your profile</li>
            <li>Add your skills and experience</li>
            <li>Upload profile photo</li>
            <li>Get verified (optional but recommended)</li>
          </ol>
          
          <p>If you have any questions or need assistance, our support team is here to help at <a href="mailto:${data.supportEmail}">${data.supportEmail}</a>.</p>
          
          <p>Best regards,<br>
          <strong>The ExtraHand Team</strong></p>
        </div>
        <div class="footer">
          <p>This is an automated email. Please do not reply to this message.</p>
          <p>
            <a href="${data.loginUrl}">Login</a> • 
            <a href="https://extrahand.in/help">Help Center</a> • 
            <a href="https://extrahand.in/contact">Contact Us</a>
          </p>
          <p style="margin-top: 20px; font-size: 12px; color: #999;">
            © ${new Date().getFullYear()} ExtraHand. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `,
  
  text: (data: any) => `
Welcome to ExtraHand!

Hello ${data.name},

Your account has been successfully created on ExtraHand! We're excited to have you join our community of skilled taskers.

${data.phone ? `Your Phone Number: ${data.phone}\n` : ''}

You can now:
- Browse and apply for tasks in your area
- Build your profile and showcase your skills
- Start earning money by completing tasks
- Get verified to unlock more opportunities

Login to your account: ${data.loginUrl}

Next Steps:
1. Complete your profile
2. Add your skills and experience
3. Upload profile photo
4. Get verified (optional but recommended)

If you have any questions or need assistance, our support team is here to help at ${data.supportEmail}.

Best regards,
The ExtraHand Team

---
This is an automated email. Please do not reply to this message.
© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
