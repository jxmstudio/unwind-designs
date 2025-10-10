# Big Post API Documentation Updates

## Overview
Updated the Big Post integration to align with the official API documentation provided. All endpoints, data structures, and validation rules have been updated to match the Big Post Swagger specification.

## Key Updates Made

### 1. API Base URL
- **Updated**: `https://api.bigpost.com.au` (was `https://app.bigpost.com.au`)
- **Files**: `src/lib/bigpost.ts`, `src/lib/bigpost-shipping.ts`

### 2. API Endpoints
- **Quote Endpoint**: `/api/getquote` (POST)
- **Create Job Endpoint**: `/api/createjob` (POST)
- **Files**: `src/lib/bigpost.ts`, `src/lib/bigpost-shipping.ts`

### 3. JobType Enum Updates
```typescript
export enum JobType {
  DEPOT = 1,        // Depot delivery
  DIRECT = 2,       // Direct delivery  
  HOME_DELIVERY = 3 // Home delivery (BuyerIsBusiness must be false)
}
```
- **File**: `src/types/bigpost.ts`

### 4. ItemType Enum Updates
```typescript
export enum ItemType {
  CARTON = 0,     // Carton
  SKID = 1,       // Skid
  PALLET = 2,     // Pallet
  PACK = 3,       // Pack
  CRATE = 4,      // Crate
  ROLL = 5,       // Roll
  SATCHEL = 6,    // Satchel
  STILLAGE = 7,   // Stillage
  TUBE = 8,       // Tube
  BAG = 9         // Bag
}
```
- **File**: `src/types/bigpost.ts`

### 5. Quote Request Structure
Updated to match API documentation exactly:
```typescript
{
  JobType?: JobType; // optional - if left blank, quotes for all job types
  BuyerIsBusiness?: boolean; // must be false for Home Delivery (JobType=3)
  BuyerHasForklift?: boolean;
  ReturnAuthorityToLeaveOptions?: boolean; // if true, provides quotes for services where goods can be left without signature (items must be 40kg or less)
  JobDate?: string; // date for job pickup
  DepotId?: number; // Big Post ID of depot, if blank closest depot to buyer will be used
  PickupLocation: ApiLocationModel; // required
  BuyerLocation: ApiLocationModel; // required
  Items: ApiItemModel[]; // required
}
```

### 6. Create Job Request Structure
Updated to match API documentation:
```typescript
{
  ContactName: string; // max 50 chars, required
  BuyerEmail: string; // email format, required - must match regex: \w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*
  BuyerMobilePhone?: string; // max 10 chars, optional
  BuyerOtherPhone?: string; // max 10 chars, optional
  CarrierId: string; // required
  Reference?: string; // max 50 chars, optional
  JobType: JobType; // required (single value, not array)
  DepotId?: number; // optional
  ContainsDangerousGoods: boolean; // required
  BuyerHasForklift: boolean; // required
  HasDeclaredCarParts: boolean; // required
  SpecialInstructions?: string; // optional
  PickupLocation: ApiLocationModel; // required
  BuyerLocation: ApiLocationModel; // required
  Items: ApiItemModel[]; // required
  AuthorityToLeave: boolean; // required
  ServiceCode?: string; // optional - pass from chosen quote if provided
  SourceType: number; // required
}
```

### 7. Field Name Updates
Updated all field names to use PascalCase to match API documentation:
- `name` → `Name`
- `address` → `Address`
- `addressLineTwo` → `AddressLineTwo`
- `locality` → `Locality`
- `suburb` → `Suburb`
- `postcode` → `Postcode`
- `state` → `State`
- `itemType` → `ItemType`
- `description` → `Description`
- `quantity` → `Quantity`
- `height` → `Height`
- `width` → `Width`
- `length` → `Length`
- `weight` → `Weight`
- `consolidatable` → `Consolidatable`

### 8. Response Structure Updates
Updated response handling to match API documentation:
```typescript
// Quote Response
{
  Success: boolean;
  Quotes?: QuoteOption[];
  ErrorMessage?: string;
  RequestId?: string;
}

// Create Job Response
{
  Success: boolean;
  JobId?: number;
  CarrierConsignmentNumber?: string;
  ErrorMessage?: string;
  ValidationErrors?: string[];
}
```

### 9. Validation Updates
- Added email regex validation: `\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*`
- Updated field length limits to match documentation
- Fixed JobType validation (single value, not array)
- Added proper validation for Home Delivery requirements

### 10. API Request/Response Handling
- Updated request structure to use correct field names
- Updated response parsing to handle `Success`, `Quotes`, `ErrorMessage` fields
- Improved error handling for validation errors

## Files Modified

1. **`src/types/bigpost.ts`**
   - Updated enums and interfaces
   - Added comprehensive comments from documentation

2. **`src/lib/bigpost.ts`**
   - Updated API base URL
   - Updated endpoint paths
   - Improved error handling

3. **`src/lib/validation/bigpost.ts`**
   - Updated validation schemas
   - Added email regex validation
   - Fixed field length limits

4. **`src/lib/bigpost-shipping.ts`**
   - Updated request/response structures
   - Fixed field name casing
   - Updated default pickup location structure

## API Documentation Reference

The updates are based on the official Big Post API documentation:
- **Swagger UI**: https://api.bigpost.com.au/swagger/index.html
- **Base URL**: https://api.bigpost.com.au/api/

## Key API Endpoints

1. **GET Search Suburbs** - `/api/searchsuburbs`
2. **GET Closest Depots** - `/api/closestdepots`
3. **POST Get Quote** - `/api/getquote`
4. **POST Create Job** - `/api/createjob`
5. **POST Job Status History** - `/api/jobstatushistory`
6. **POST Current Job Status** - `/api/currentjobstatus`

## Next Steps

1. **Test API Integration**: Verify the updated integration works with the Big Post API
2. **Update Environment Variables**: Ensure the correct API key is configured
3. **Monitor API Responses**: Check that all responses are properly parsed
4. **Update Documentation**: Keep this document updated as the API evolves

## Contact Information

For Big Post API support:
- **Email**: helpdesk@bigpost.com.au
- **Phone**: 03 9544 5525
- **Reference**: API Token from environment variables
