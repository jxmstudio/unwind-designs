import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    BIGPOST_API_KEY: process.env.BIGPOST_API_KEY ? 'SET' : 'NOT SET',
    BIG_POST_API_KEY: process.env.BIG_POST_API_KEY ? 'SET' : 'NOT SET', 
    BIG_POST_API_TOKEN: process.env.BIG_POST_API_TOKEN ? 'SET' : 'NOT SET',
    tokenValue: process.env.BIG_POST_API_TOKEN || 'NOT SET'
  });
}
