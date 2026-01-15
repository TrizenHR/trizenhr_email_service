/**
 * Script to generate base64 encoded logo for email templates
 * 
 * Usage:
 *   node scripts/generate-logo-base64.js <logo-url-or-path>
 * 
 * Examples:
 *   node scripts/generate-logo-base64.js https://example.com/logo.png
 *   node scripts/generate-logo-base64.js ./assets/logo.png
 *   node scripts/generate-logo-base64.js /absolute/path/to/logo.png
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

async function fetchLogoAsBuffer(input) {
  // Check if it's a local file
  if (input.startsWith('/') || input.startsWith('./') || input.startsWith('../') || !input.includes('://')) {
    const filePath = path.isAbsolute(input) ? input : path.join(process.cwd(), input);
    if (fs.existsSync(filePath)) {
      console.log(`📁 Reading logo from local file: ${filePath}`);
      return fs.readFileSync(filePath);
    } else {
      throw new Error(`File not found: ${filePath}`);
    }
  }
  
  // Fetch from URL
  console.log(`🌐 Fetching logo from URL: ${input}`);
  return new Promise((resolve, reject) => {
    let parsedUrl;
    try {
      parsedUrl = new URL(input);
    } catch (error) {
      reject(new Error(`Invalid URL: ${input}`));
      return;
    }
    
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    const request = client.get(input, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to fetch logo: HTTP ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        console.log(`✅ Logo fetched successfully (${buffer.length} bytes)`);
        resolve(buffer);
      });
    });

    request.on('error', (error) => {
      reject(new Error(`Network error: ${error.message}`));
    });

    request.setTimeout(15000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

function getBase64DataUri(buffer, urlOrPath) {
  // Detect content type
  let contentType = 'image/png';
  const lower = urlOrPath.toLowerCase();
  
  if (lower.includes('.jpg') || lower.includes('.jpeg')) {
    contentType = 'image/jpeg';
  } else if (lower.includes('.gif')) {
    contentType = 'image/gif';
  } else if (lower.includes('.webp')) {
    contentType = 'image/webp';
  } else if (lower.includes('.svg')) {
    contentType = 'image/svg+xml';
  }
  
  const base64 = buffer.toString('base64');
  return `data:${contentType};base64,${base64}`;
}

async function main() {
  const input = process.argv[2];
  
  if (!input) {
    console.error('❌ Error: Please provide a logo URL or file path');
    console.log('\nUsage:');
    console.log('  node scripts/generate-logo-base64.js <logo-url-or-path>');
    console.log('\nExamples:');
    console.log('  node scripts/generate-logo-base64.js https://example.com/logo.png');
    console.log('  node scripts/generate-logo-base64.js ./assets/logo.png');
    process.exit(1);
  }
  
  try {
    const buffer = await fetchLogoAsBuffer(input);
    const base64DataUri = getBase64DataUri(buffer, input);
    
    console.log('\n' + '='.repeat(80));
    console.log('📋 BASE64 DATA URI (Copy this):');
    console.log('='.repeat(80));
    console.log(base64DataUri);
    console.log('='.repeat(80));
    console.log(`\n✅ Base64 length: ${base64DataUri.length} characters`);
    console.log(`✅ Image size: ${buffer.length} bytes`);
    console.log('\n💡 This base64 string can be embedded directly in HTML img src attribute');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
