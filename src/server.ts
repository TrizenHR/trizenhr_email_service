import { createApp } from './app';
import { connectMongo } from './config/database';
import { validateEnv } from './config/env';
import logger from './config/logger';
import { SMTPProvider } from './services/providers/SMTPProvider';

const env = validateEnv();

async function startServer() {
  try {
    // Connect to MongoDB
    await connectMongo(env.MONGODB_URI, env.MONGODB_DB);

    let smtpVerified = { primary: false, org: false };

    if (env.EMAIL_PROVIDER === 'smtp') {
      logger.info('Verifying SMTP connections at startup...');
      const smtp = new SMTPProvider();
      smtpVerified = await smtp.verify();
    }

    // Create Express app
    const app = createApp();

    // Start server
    const port = env.PORT;
    app.listen(port, () => {
      logger.info(`🚀 Email Service running on port ${port}`);
      logger.info(`📝 Environment: ${env.NODE_ENV}`);
      logger.info(`📧 Email Provider: ${env.EMAIL_PROVIDER}`);
      logger.info(`📨 Platform From: ${env.EMAIL_FROM_ADDRESS}`);
      if (env.SMTP_PLATFORM_USE_ORG && env.EMAIL_FROM_ADDRESS_ORG) {
        logger.info(
          `📨 Platform routing (temporary): ${env.EMAIL_FROM_ADDRESS_ORG} via org SMTP`
        );
      }
      logger.info(
        `📨 Org staff From: ${env.EMAIL_FROM_ADDRESS_ORG || '(not set)'} (HR/manager/employee invites)`
      );
      const platformOk = env.SMTP_PLATFORM_USE_ORG ? smtpVerified.org : smtpVerified.primary;
      logger.info(
        `📬 Platform SMTP authenticated: ${platformOk ? 'YES' : 'NO'}`
      );
      logger.info(
        `📬 Org SMTP authenticated: ${smtpVerified.org ? 'YES' : 'NO'} (employee/HR/manager invites)`
      );
      if (!smtpVerified.org && env.SMTP_USER_ORG) {
        logger.error(
          '⚠️  Fix SMTP_PASS_ORG in .env — Microsoft rejected login for support@trizenventures.com'
        );
      }
      logger.info(`🔗 Health check: http://localhost:${port}/api/v1/health`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM signal received: closing HTTP server');
      process.exit(0);
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT signal received: closing HTTP server');
      process.exit(0);
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
