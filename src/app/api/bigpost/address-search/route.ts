// BigPost Address Search API Route
// Provides autocomplete for Australian addresses using BigPost API

import { NextRequest, NextResponse } from 'next/server';
import { bigPostAPI } from '@/lib/bigpost';
import { StateCode } from '@/types/bigpost';

interface AddressSearchRequest {
  q: string;
  type?: 'street' | 'suburb' | 'city' | 'postcode';
  state?: string;
}

interface AddressSearchResult {
  value: string;
  label: string;
  description?: string;
  suburb: string;
  postcode: string;
  state: StateCode;
  localityId?: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') as 'street' | 'suburb' | 'city' | 'postcode' | null;
    const state = searchParams.get('state');

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Query must be at least 2 characters',
        results: []
      });
    }

    console.log('BigPost address search:', { query, type, state });

    // Try BigPost API first
    try {
      const searchRequest = {
        Query: query,
        State: state ? state.toUpperCase() as StateCode : undefined
      };

      const response = await bigPostAPI.searchSuburbs(searchRequest);
      
      if (response.Success && response.Results && response.Results.length > 0) {
        // Normalize results for autocomplete
        const results: AddressSearchResult[] = response.Results.slice(0, 10).map(result => ({
          value: `${result.Suburb}, ${result.Postcode}, ${result.State}`,
          label: `${result.Suburb}, ${result.Postcode}`,
          description: `${result.State}`,
          suburb: result.Suburb,
          postcode: result.Postcode,
          state: result.State,
          localityId: result.Id
        }));

        console.log('BigPost address search results:', results.length);
        return NextResponse.json({
          success: true,
          results
        });
      }
    } catch (bigPostError) {
      console.warn('BigPost API failed, using fallback:', bigPostError);
    }

    // Fallback to local data if BigPost fails
    console.log('Using fallback address search for:', query);
    const fallbackResults = getFallbackAddressResults(query, state);
    
    return NextResponse.json({
      success: true,
      results: fallbackResults,
      fallback: true
    });

  } catch (error) {
    console.error('Address search error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      results: []
    }, { status: 500 });
  }
}

// Fallback address data when BigPost API is unavailable
function getFallbackAddressResults(query: string, state?: string | null): AddressSearchResult[] {
  const fallbackData = [
    // Victoria
    { suburb: 'Melbourne', postcode: '3000', state: 'VIC' },
    { suburb: 'Geelong', postcode: '3220', state: 'VIC' },
    { suburb: 'Ballarat', postcode: '3350', state: 'VIC' },
    { suburb: 'Bendigo', postcode: '3550', state: 'VIC' },
    { suburb: 'Shepparton', postcode: '3630', state: 'VIC' },
    { suburb: 'Warrnambool', postcode: '3280', state: 'VIC' },
    { suburb: 'Albury', postcode: '2640', state: 'VIC' },
    { suburb: 'Wodonga', postcode: '3690', state: 'VIC' },
    { suburb: 'Traralgon', postcode: '3844', state: 'VIC' },
    { suburb: 'Frankston', postcode: '3199', state: 'VIC' },
    
    // New South Wales
    { suburb: 'Sydney', postcode: '2000', state: 'NSW' },
    { suburb: 'Newcastle', postcode: '2300', state: 'NSW' },
    { suburb: 'Wollongong', postcode: '2500', state: 'NSW' },
    { suburb: 'Wagga Wagga', postcode: '2650', state: 'NSW' },
    { suburb: 'Tamworth', postcode: '2340', state: 'NSW' },
    { suburb: 'Orange', postcode: '2800', state: 'NSW' },
    { suburb: 'Dubbo', postcode: '2830', state: 'NSW' },
    { suburb: 'Nowra', postcode: '2541', state: 'NSW' },
    { suburb: 'Bathurst', postcode: '2795', state: 'NSW' },
    { suburb: 'Lismore', postcode: '2480', state: 'NSW' },
    
    // Queensland
    { suburb: 'Brisbane', postcode: '4000', state: 'QLD' },
    { suburb: 'Gold Coast', postcode: '4217', state: 'QLD' },
    { suburb: 'Townsville', postcode: '4810', state: 'QLD' },
    { suburb: 'Cairns', postcode: '4870', state: 'QLD' },
    { suburb: 'Toowoomba', postcode: '4350', state: 'QLD' },
    { suburb: 'Rockhampton', postcode: '4700', state: 'QLD' },
    { suburb: 'Mackay', postcode: '4740', state: 'QLD' },
    { suburb: 'Bundaberg', postcode: '4670', state: 'QLD' },
    { suburb: 'Hervey Bay', postcode: '4655', state: 'QLD' },
    { suburb: 'Gladstone', postcode: '4680', state: 'QLD' },
    
    // South Australia
    { suburb: 'Adelaide', postcode: '5000', state: 'SA' },
    { suburb: 'Mount Gambier', postcode: '5290', state: 'SA' },
    { suburb: 'Whyalla', postcode: '5600', state: 'SA' },
    { suburb: 'Murray Bridge', postcode: '5253', state: 'SA' },
    { suburb: 'Port Augusta', postcode: '5700', state: 'SA' },
    { suburb: 'Port Pirie', postcode: '5540', state: 'SA' },
    { suburb: 'Port Lincoln', postcode: '5606', state: 'SA' },
    { suburb: 'Victor Harbor', postcode: '5211', state: 'SA' },
    { suburb: 'Gawler', postcode: '5118', state: 'SA' },
    { suburb: 'Kadina', postcode: '5554', state: 'SA' },
    
    // Western Australia
    { suburb: 'Perth', postcode: '6000', state: 'WA' },
    { suburb: 'Fremantle', postcode: '6160', state: 'WA' },
    { suburb: 'Rockingham', postcode: '6168', state: 'WA' },
    { suburb: 'Mandurah', postcode: '6210', state: 'WA' },
    { suburb: 'Bunbury', postcode: '6230', state: 'WA' },
    { suburb: 'Geraldton', postcode: '6530', state: 'WA' },
    { suburb: 'Albany', postcode: '6330', state: 'WA' },
    { suburb: 'Broome', postcode: '6725', state: 'WA' },
    { suburb: 'Kalgoorlie', postcode: '6430', state: 'WA' },
    { suburb: 'Port Hedland', postcode: '6721', state: 'WA' },
    
    // Tasmania
    { suburb: 'Hobart', postcode: '7000', state: 'TAS' },
    { suburb: 'Launceston', postcode: '7250', state: 'TAS' },
    { suburb: 'Devonport', postcode: '7310', state: 'TAS' },
    { suburb: 'Burnie', postcode: '7320', state: 'TAS' },
    { suburb: 'Ulverstone', postcode: '7315', state: 'TAS' },
    { suburb: 'George Town', postcode: '7253', state: 'TAS' },
    { suburb: 'Queenstown', postcode: '7467', state: 'TAS' },
    { suburb: 'Scottsdale', postcode: '7260', state: 'TAS' },
    { suburb: 'Smithton', postcode: '7330', state: 'TAS' },
    { suburb: 'Wynyard', postcode: '7325', state: 'TAS' },
    
    // Northern Territory
    { suburb: 'Darwin', postcode: '0800', state: 'NT' },
    { suburb: 'Alice Springs', postcode: '0870', state: 'NT' },
    { suburb: 'Katherine', postcode: '0850', state: 'NT' },
    { suburb: 'Palmerston', postcode: '0830', state: 'NT' },
    { suburb: 'Nhulunbuy', postcode: '0880', state: 'NT' },
    { suburb: 'Tennant Creek', postcode: '0860', state: 'NT' },
    { suburb: 'Yulara', postcode: '0872', state: 'NT' },
    { suburb: 'Casuarina', postcode: '0810', state: 'NT' },
    { suburb: 'Humpty Doo', postcode: '0836', state: 'NT' },
    { suburb: 'Batchelor', postcode: '0845', state: 'NT' },
    
    // Australian Capital Territory
    { suburb: 'Canberra', postcode: '2600', state: 'ACT' },
    { suburb: 'Gungahlin', postcode: '2912', state: 'ACT' },
    { suburb: 'Tuggeranong', postcode: '2900', state: 'ACT' },
    { suburb: 'Weston Creek', postcode: '2611', state: 'ACT' },
    { suburb: 'Belconnen', postcode: '2617', state: 'ACT' },
    { suburb: 'Woden Valley', postcode: '2606', state: 'ACT' },
    { suburb: 'Inner South', postcode: '2603', state: 'ACT' },
    { suburb: 'North Canberra', postcode: '2601', state: 'ACT' },
    { suburb: 'South Canberra', postcode: '2604', state: 'ACT' },
    { suburb: 'Jerrabomberra', postcode: '2619', state: 'ACT' }
  ];

  // Filter by state if provided
  let filteredData = fallbackData;
  if (state) {
    filteredData = fallbackData.filter(item => item.state === state.toUpperCase());
  }

  // Filter by query
  const results = filteredData
    .filter(item => 
      item.suburb.toLowerCase().includes(query.toLowerCase()) ||
      item.postcode.includes(query)
    )
    .slice(0, 10)
    .map(item => ({
      value: `${item.suburb}, ${item.postcode}, ${item.state}`,
      label: `${item.suburb}, ${item.postcode}`,
      description: `${item.state}`,
      suburb: item.suburb,
      postcode: item.postcode,
      state: item.state as StateCode,
      localityId: undefined
    }));

  return results;
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed. Use GET for address search.',
  }, { status: 405 });
}
