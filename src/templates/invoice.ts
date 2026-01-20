import { EmailTemplate } from '../types';
import { EXTRAHAND_LOGO_SVG } from './logo';

export const invoiceTemplate: EmailTemplate = {
  name: 'invoice',
  subject: '🧾 Invoice #${data.invoiceNumber} - ExtraHand',
  
  html: (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#0F172A;color:#fff;padding:12px 24px;font-size:13px;letter-spacing:0.3px;text-align:center;">
              Invoice
            </td>
          </tr>
          
          <tr>
            <td style="padding:32px 32px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
              <div style="margin-bottom:16px;">${EXTRAHAND_LOGO_SVG}</div>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">Invoice #${data.invoiceNumber || 'N/A'}</h1>
              <p style="margin:8px 0 0;font-size:14px;color:#6b7280;">${data.invoiceDate || new Date().toLocaleDateString()}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                Hi <strong>${data.userName || 'there'}</strong>,
              </p>
              <p style="margin:0 0 18px;color:#374151;font-size:16px;line-height:1.6;">
                ${data.invoiceType === 'monthly' 
                  ? 'Here is your monthly invoice for your ExtraHand transactions.'
                  : 'Here is your invoice for your recent transaction on ExtraHand.'}
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 18px;">
                <tr>
                  <td style="padding:20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr style="border-bottom:1px solid #e5e7eb;">
                        <td style="padding:8px 0;font-size:14px;color:#6b7280;font-weight:600;">Description</td>
                        <td style="padding:8px 0;font-size:14px;color:#6b7280;font-weight:600;text-align:right;">Amount</td>
                      </tr>
                      ${data.lineItems ? data.lineItems.map((item: any) => `
                      <tr>
                        <td style="padding:8px 0;font-size:14px;color:#374151;">${item.description}</td>
                        <td style="padding:8px 0;font-size:14px;color:#111827;text-align:right;">₹${item.amount}</td>
                      </tr>
                      `).join('') : `
                      <tr>
                        <td style="padding:8px 0;font-size:14px;color:#374151;">${data.description || 'Service charges'}</td>
                        <td style="padding:8px 0;font-size:14px;color:#111827;text-align:right;">₹${data.subtotal || data.amount || '0'}</td>
                      </tr>
                      `}
                      ${data.platformFee ? `
                      <tr>
                        <td style="padding:8px 0;font-size:14px;color:#374151;">Platform Fee</td>
                        <td style="padding:8px 0;font-size:14px;color:#111827;text-align:right;">₹${data.platformFee}</td>
                      </tr>
                      ` : ''}
                      ${data.gst ? `
                      <tr>
                        <td style="padding:8px 0;font-size:14px;color:#374151;">GST (18%)</td>
                        <td style="padding:8px 0;font-size:14px;color:#111827;text-align:right;">₹${data.gst}</td>
                      </tr>
                      ` : ''}
                      <tr style="border-top:2px solid #e5e7eb;">
                        <td style="padding:12px 0;font-size:16px;color:#111827;font-weight:700;">Total</td>
                        <td style="padding:12px 0;font-size:18px;color:#111827;font-weight:700;text-align:right;">₹${data.total || data.amount || '0'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${data.billingPeriod ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 18px;">
                <tr>
                  <td style="font-size:14px;color:#6b7280;">Billing Period:</td>
                  <td style="font-size:14px;color:#111827;text-align:right;">${data.billingPeriod}</td>
                </tr>
              </table>
              ` : ''}

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:10px 0 20px;">
                    <a href="${data.invoiceUrl || 'https://extrahand.in/invoices'}" style="display:inline-block;background:#F59E0B;color:#fff !important;text-decoration:none;padding:14px 30px;border-radius:8px;font-size:16px;font-weight:700;">Download Invoice</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;color:#6b7280;font-size:13px;line-height:1.6;">This is an automated invoice.</p>
              <p style="margin:0 0 8px;font-size:13px;">
                <a href="https://extrahand.in/invoices" style="color:#F59E0B;text-decoration:none;">All Invoices</a> ·
                <a href="https://extrahand.in/help" style="color:#F59E0B;text-decoration:none;">Help Center</a>
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
  `,
  
  text: (data: any) => `
🧾 Invoice #${data.invoiceNumber || 'N/A'} - ExtraHand

Hi ${data.userName || 'there'},

${data.invoiceType === 'monthly' 
  ? 'Here is your monthly invoice for your ExtraHand transactions.'
  : 'Here is your invoice for your recent transaction on ExtraHand.'}

Invoice Details:
-----------------
${data.lineItems ? data.lineItems.map((item: any) => `${item.description}: ₹${item.amount}`).join('\n') : `${data.description || 'Service charges'}: ₹${data.subtotal || data.amount || '0'}`}
${data.platformFee ? `Platform Fee: ₹${data.platformFee}` : ''}
${data.gst ? `GST (18%): ₹${data.gst}` : ''}
-----------------
Total: ₹${data.total || data.amount || '0'}

${data.billingPeriod ? `Billing Period: ${data.billingPeriod}` : ''}

Download invoice: ${data.invoiceUrl || 'https://extrahand.in/invoices'}

© ${new Date().getFullYear()} ExtraHand. All rights reserved.
  `
};
