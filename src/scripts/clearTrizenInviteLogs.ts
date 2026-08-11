/**
 * Clear TrizenHR invitation email logs from the email service database.
 * Does not touch backend users — run resetTestUsers.ts in trizenhr_backend for that.
 *
 * Usage:
 *   npx ts-node src/scripts/clearTrizenInviteLogs.ts --dry-run
 *   CONFIRM_RESET=yes npx ts-node src/scripts/clearTrizenInviteLogs.ts
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const INVITE_LOG_TYPES = ['trizen_role_invite', 'organization_created_support'];

function parseArgs() {
  return {
    dryRun: process.argv.includes('--dry-run'),
  };
}

async function main() {
  const opts = parseArgs();
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'emails';

  if (!uri) {
    throw new Error('MONGODB_URI is required in trizenhr_email_service/.env');
  }

  console.log(`Connecting to MongoDB (db: ${dbName})...`);
  await mongoose.connect(uri, { dbName });

  const col = mongoose.connection.collection('emaillogs');
  const filter = { 'metadata.type': { $in: INVITE_LOG_TYPES } };
  const count = await col.countDocuments(filter);

  console.log(`TrizenHR invite-related email logs: ${count}`);

  if (opts.dryRun) {
    console.log('[DRY RUN] No changes written.');
    await mongoose.disconnect();
    return;
  }

  if (process.env.CONFIRM_RESET !== 'yes') {
    console.error(
      '\nRefusing to delete without CONFIRM_RESET=yes.\n' +
        'Example: CONFIRM_RESET=yes npx ts-node src/scripts/clearTrizenInviteLogs.ts'
    );
    process.exit(1);
  }

  const result = await col.deleteMany(filter);
  console.log(`Deleted ${result.deletedCount} email log(s).`);
  await mongoose.disconnect();
}

main()
  .then(() => {
    console.log('\nDone.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\nFailed:', err);
    process.exit(1);
  });
