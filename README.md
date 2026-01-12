# ExtraHand Email Service

Email service for the ExtraHand platform. Handles all email communications across web app, mobile app, and admin dashboards.

## Features

- ✅ **Multiple Providers**: SMTP (Microsoft/Outlook optimized), SendGrid, AWS SES
- ✅ **Template System**: Pre-built email templates with variable substitution
- ✅ **Email Logging**: MongoDB logging for sent/failed emails
- ✅ **Service Authentication**: Secure service-to-service communication
- ✅ **Production Ready**: Winston logging, error handling, graceful shutdown

## Tech Stack

- **Framework**: Express.js with TypeScript
- **Database**: MongoDB (email logs and templates)
- **Email Providers**: Nodemailer (SMTP), SendGrid, AWS SES
- **Logging**: Winston
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- Email provider credentials (SMTP, SendGrid, or AWS SES)

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your credentials
nano .env
```

### Environment Variables

See `.env.example` for all required variables. Key variables:

```env
# Service
PORT=4007
SERVICE_AUTH_TOKEN=your_secret_token

# MongoDB
MONGODB_URI=mongodb://localhost:27017/extrahand

# Email Provider
EMAIL_PROVIDER=smtp  # smtp, sendgrid, or ses

# SMTP (Microsoft/Outlook)
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=noreply@extrahand.in
SMTP_PASS=your_password

# Email Settings
EMAIL_FROM_ADDRESS=noreply@extrahand.in
EMAIL_FROM_NAME=ExtraHand
```

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## API Endpoints

All endpoints require `X-Service-Auth` header for authentication.

### Health Check

```
GET /api/v1/health
```

### Send Account Created Email

```
POST /api/v1/email/account-created
Content-Type: application/json
X-Service-Auth: your_service_token

{
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "+919876543210"
}
```

### Send Generic Email

```
POST /api/v1/email/send
Content-Type: application/json
X-Service-Auth: your_service_token

{
  "to": "user@example.com",
  "subject": "Welcome",
  "template": "account_created",
  "data": {
    "name": "John",
    "loginUrl": "https://extrahand.in/login"
  }
}
```

## Email Templates

Available templates:
- `account_created` - Welcome email after account creation

## Integration

### From Admin Service

```typescript
import axios from 'axios';

await axios.post(
  'http://localhost:4007/api/v1/email/account-created',
  {
    email: 'user@example.com',
    name: 'John Doe',
    phone: '+919876543210'
  },
  {
    headers: {
      'X-Service-Auth': process.env.SERVICE_AUTH_TOKEN,
      'X-Service-Name': 'admin-service'
    }
  }
);
```

## Docker

```bash
# Build
docker build -t extrahand-email-service .

# Run
docker run -p 4007:4007 --env-file .env extrahand-email-service
```

## License

Private - ExtraHand Platform
