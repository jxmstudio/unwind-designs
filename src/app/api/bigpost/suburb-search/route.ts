// BigPost Suburb Search API Route
import { NextRequest, NextResponse } from 'next/server';
import { bigPostAPI } from '@/lib/bigpost';
import { StateCode } from '@/types/bigpost';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const state = searchParams.get('state') as StateCode | null;

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Query must be at least 2 characters',
      }, { status: 400 });
    }

    console.log('[Suburb Search API] Searching for:', { query, state });

    const response = await bigPostAPI.searchSuburbs({
      Query: query,
      ...(state && { State: state })
    });

    if (response.Success && response.Results) {
      console.log(`[Suburb Search API] Found ${response.Results.length} results`);
      return NextResponse.json({
        success: true,
        results: response.Results
      });
    } else {
      console.error('[Suburb Search API] Error:', response.ErrorMessage);
      return NextResponse.json({
        success: false,
        error: response.ErrorMessage || 'No suburbs found',
        results: []
      });
    }
  } catch (error) {
    console.error('[Suburb Search API] Exception:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Suburb search failed',
      results: []
    }, { status: 500 });
  }
}

