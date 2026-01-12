import { createApp } from './app';
import { connectMongo } from './config/database';
import { validateEnv } from './config/env';
import logger from './config/logger';

const env = validateEnv();

async function startServer() {
  try {
    // Connect to MongoDB
    await connectMongo(env.MONGODB_URI, env.MONGODB_DB);

    // Create Express app
    const app = createApp();

    // Start server
    const port = env.PORT;
    app.listen(port, () => {
      logger.info(`🚀 Email Service running on port ${port}`);
      logger.info(`📝 Environment: ${env.NODE_ENV}`);
      logger.info(`📧 Email Provider: ${env.EMAIL_PROVIDER}`);
      logger.info(`📨 From: ${env.EMAIL_FROM_ADDRESS}`);
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
