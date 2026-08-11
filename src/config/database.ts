import dns from 'node:dns';
import mongoose from 'mongoose';
import logger from './logger';

// Temporary workaround for DNS resolution issues
dns.setServers(['8.8.8.8', '8.8.4.4']);

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

let isConnected = false;

export async function connectMongo(
  uri: string,
  dbName: string
): Promise<typeof mongoose.connection> {
  if (!uri) {
    throw new Error('Missing MONGODB_URI');
  }

  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  mongoose.set('strictQuery', true);

  // Auto-fix malformed URI if detected
  if (uri.includes('appName=Cluster0w=majority')) {
    uri = uri.replace(
      /appName=Cluster0w=majority&appName=Cluster0/,
      'appName=Cluster0'
    );

    logger.warn('⚠️ Detected malformed MongoDB URI, auto-fixing...');
  }

  const connectionOptions = {
    dbName,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    minPoolSize: 2,
  };

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      logger.info(
        `🔌 Connecting to MongoDB (Attempt ${attempt}/${MAX_RETRIES})...`
      );

      const conn = await mongoose.connect(uri, connectionOptions);

      isConnected = true;

      logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
      logger.info(
        `📊 Database: ${
          conn.connection.db?.databaseName || connectionOptions.dbName
        }`
      );

      return mongoose.connection;
    } catch (error) {
      const err = error as Error;

      isConnected = false;

      logger.error(
        `❌ MongoDB connection failed (Attempt ${attempt}/${MAX_RETRIES}): ${err.message}`
      );

      const isDnsError =
        err.message.includes('querySrv') ||
        err.message.includes('ECONNREFUSED') ||
        err.message.includes('ENOTFOUND') ||
        err.message.includes('ETIMEOUT');

      if (isDnsError) {
        logger.error(`
→ DNS resolution failed.
Check:
• Internet connection
• Firewall / VPN
• DNS settings
• Try Google's DNS (8.8.8.8 / 8.8.4.4)
        `);
      }

      if (attempt < MAX_RETRIES) {
        logger.info(`⏳ Retrying in ${RETRY_DELAY_MS / 1000}s...`);
        await new Promise((resolve) =>
          setTimeout(resolve, RETRY_DELAY_MS)
        );
      } else {
        logger.error('❌ MongoDB connection failed after all retries.');
        throw err;
      }
    }
  }

  throw new Error('MongoDB connection failed');
}

// Connection Events
mongoose.connection.on('connected', () => {
  isConnected = true;
  logger.info('✅ MongoDB connection established');
});

mongoose.connection.on('error', (err) => {
  isConnected = false;
  logger.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  logger.warn('⚠️ MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  isConnected = true;
  logger.info('✅ MongoDB reconnected');
});

export async function disconnectMongo(): Promise<void> {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    logger.info('✅ MongoDB disconnected');
  }
}

export function getConnectionStatus(): boolean {
  const readyState = mongoose.connection.readyState;
  return isConnected && readyState === 1;
}