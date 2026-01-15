/**
 * Test script to verify logo fetching works
 * Run with: node test-logo-fetch.js
 */

require('dotenv').config();
const { fetchLogoAsBuffer, getLogoAsBase64 } = require('./dist/utils/logoUtils');

async function testLogoFetch() {
  console.log('🧪 Testing Logo Fetch...\n');
  
  try {
    console.log('1. Testing fetchLogoAsBuffer()...');
    const buffer = await fetchLogoAsBuffer();
    
    if (buffer) {
      console.log('✅ Logo buffer fetched successfully!');
      console.log(`   Size: ${buffer.length} bytes`);
      console.log(`   First 20 bytes: ${buffer.slice(0, 20).toString('hex')}`);
    } else {
      console.log('❌ Logo buffer is null');
    }
    
    console.log('\n2. Testing getLogoAsBase64()...');
    const base64 = await getLogoAsBase64();
    
    if (base64) {
      console.log('✅ Logo base64 fetched successfully!');
      console.log(`   Length: ${base64.length} characters`);
      console.log(`   Preview: ${base64.substring(0, 50)}...`);
      console.log(`   Is valid data URI: ${base64.startsWith('data:image/')}`);
    } else {
      console.log('❌ Logo base64 is null');
    }
    
    console.log('\n✅ All tests completed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testLogoFetch();
