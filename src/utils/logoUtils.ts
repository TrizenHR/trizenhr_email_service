import https from 'https';
import http from 'http';
import { URL } from 'url';
import fs from 'fs';
import path from 'path';
import logger from '../config/logger';

/**
 * Fetch logo image from URL, local file, or return null
 * Supports:
 * 1. HTTP/HTTPS URLs
 * 2. Local file paths (absolute or relative to project root)
 * 3. Returns null on failure (doesn't throw)
 */
export async function fetchLogoAsBuffer(logoUrl?: string): Promise<Buffer | null> {
  const url = logoUrl || process.env.LOGO_URL || 
    'https://tasker-onboarding-platform-api.apps.extrahand.in/images-logo/logo.png';
  
  // Check if it's a local file path
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../') || !url.includes('://')) {
    try {
      const filePath = path.isAbsolute(url) ? url : path.join(process.cwd(), url);
      if (fs.existsSync(filePath)) {
        const buffer = fs.readFileSync(filePath);
        logger.info('Logo loaded from local file', {
          path: filePath,
          size: buffer.length,
        });
        return buffer;
      } else {
        logger.warn('Logo file not found', { path: filePath });
        return null;
      }
    } catch (error: any) {
      logger.error('Error reading logo file', { error: error.message, path: url });
      return null;
    }
  }
  
  // Try to fetch from URL
  try {
    return new Promise((resolve) => {
      let parsedUrl: URL;
      try {
        parsedUrl = new URL(url);
      } catch (error) {
        logger.error('Invalid logo URL', { url, error: (error as Error).message });
        resolve(null);
        return;
      }
      
      const client = parsedUrl.protocol === 'https:' ? https : http;
      
      const request = client.get(url, (response) => {
        if (response.statusCode !== 200) {
          logger.warn('Logo URL returned non-200 status', {
            url: url.substring(0, 100),
            statusCode: response.statusCode,
          });
          resolve(null); // Return null instead of rejecting
          return;
        }

        const chunks: Buffer[] = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => {
          const buffer = Buffer.concat(chunks);
          logger.info('Logo fetched successfully from URL', {
            url: url.substring(0, 100) + '...',
            size: buffer.length,
          });
          resolve(buffer);
        });
      });

      request.on('error', (error) => {
        logger.warn('Failed to fetch logo from URL', { 
          error: error.message, 
          url: url.substring(0, 100) 
        });
        resolve(null); // Return null instead of rejecting
      });

      request.setTimeout(10000, () => {
        request.destroy();
        logger.warn('Logo fetch timeout', { url: url.substring(0, 100) });
        resolve(null); // Return null instead of rejecting
      });
    });
  } catch (error: any) {
    logger.error('Error fetching logo', { error: error.message, url });
    return null;
  }
}

/**
 * Get logo as base64 data URI
 */
export async function getLogoAsBase64(logoUrl?: string): Promise<string | null> {
  const buffer = await fetchLogoAsBuffer(logoUrl);
  if (!buffer) return null;
  
  // Detect content type from buffer or URL
  const url = logoUrl || process.env.LOGO_URL || '';
  let contentType = 'image/png';
  if (url.includes('.jpg') || url.includes('.jpeg')) {
    contentType = 'image/jpeg';
  } else if (url.includes('.gif')) {
    contentType = 'image/gif';
  } else if (url.includes('.webp')) {
    contentType = 'image/webp';
  }
  
  const base64 = buffer.toString('base64');
  return `data:${contentType};base64,${base64}`;
}
