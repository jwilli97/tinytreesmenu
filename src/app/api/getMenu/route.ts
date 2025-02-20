import { NextResponse } from 'next/server';

let cachedUrl: string | null = null;
let lastFetch: number = 0;
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

export async function GET() {
  try {
    // Check if we have a cached URL that's still valid
    if (cachedUrl && (Date.now() - lastFetch) < CACHE_DURATION) {
      return NextResponse.json({ imageUrl: cachedUrl });
    }

    const response = await fetch('https://qrco.de/holidaymenu', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': 'https://qrco.de/',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
      }
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch menu: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: `Failed to fetch menu: ${response.status}` },
        { status: response.status }
      );
    }

    const html = await response.text();
    
    // Log the full HTML for debugging
    console.log('Full HTML content:', html);

    // Look for specific image patterns we see in the network tab
    const patterns = [
      /21238494_\d+\.png\?[0-9.]+/i,
      /51230258_\d+\.png\?[0-9.]+/i,
      // Backup patterns
      /https:\/\/qrcgcustomers\.s3[.-]eu-west-1\.amazonaws\.com\/[^"'\s]+\.(?:jpg|jpeg|png|pdf|gif)\?[0-9.]+/gi,
      /<img[^>]*src="([^"]+\.(?:jpg|jpeg|png|pdf|gif)[^"]*)"/i
    ];

    let match = null;
    for (const pattern of patterns) {
      const matches = html.match(pattern);
      if (matches && matches.length > 0) {
        match = matches[0];
        // If the match doesn't include the full URL, add it
        if (!match.startsWith('http')) {
          match = `https://qrcgcustomers.s3-eu-west-1.amazonaws.com/account13454916/${match}`;
        }
        // Ensure we have a proper query parameter
        if (match.endsWith('?0')) {
          match = match.replace('?0', '?0.5818893891642476');
        }
        console.log('Found match:', match);
        break;
      }
    }

    if (!match || match.includes('{{')) {
      console.log('No valid match found, checking jQuery content');
      // Try to find jQuery content that might contain the image URL
      const jqueryPattern = /jquery\.js\?v=[^"]+/;
      const jqueryMatch = html.match(jqueryPattern);
      if (jqueryMatch) {
        console.log('Found jQuery script:', jqueryMatch[0]);
      }
      
      return NextResponse.json({
        imageUrl: 'https://qrcgcustomers.s3-eu-west-1.amazonaws.com/account13454916/21238494_127.png?0.5818893891642476'
      });
    }

    // Ensure the URL is absolute
    try {
      // If the URL is relative, it will throw an error
      new URL(match);
    } catch {
      // If it's a relative URL starting with /, make it absolute
      if (match.startsWith('/')) {
        match = `https://qrco.de${match}`;
      } else {
        // If it's a relative URL without /, add the full prefix
        match = `https://qrco.de/${match}`;
      }
    }

    // Update cache
    cachedUrl = match;
    lastFetch = Date.now();

    return NextResponse.json({ imageUrl: cachedUrl });
  } catch (error) {
    console.error('Error in getMenu:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu image' },
      { status: 500 }
    );
  }
}