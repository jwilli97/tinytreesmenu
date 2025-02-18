import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://qrco.de/holidaymenu', {
      redirect: 'follow',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch menu image');
    }

    // Get the final URL after all redirects
    const finalUrl = response.url;

    return NextResponse.json({ url: finalUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}