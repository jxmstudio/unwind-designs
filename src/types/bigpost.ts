// BigPost API Types - Generated from Swagger specification
// https://api.bigpost.com.au/swagger/index.html

// Enums - Updated to match Big Post API documentation
export enum JobType {
  DEPOT = 1,        // Depot delivery (customer picks up from depot)
  DIRECT = 2        // Direct delivery (home or business delivery)
  // Note: API only accepts 1, 2, or null (for all options)
  // There is NO JobType 3 - use null to get all delivery options
}

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

export enum StateCode {
  ACT = 'ACT',
  NSW = 'NSW',
  NT = 'NT',
  QLD = 'QLD',
  SA = 'SA',
  TAS = 'TAS',
  VIC = 'VIC',
  WA = 'WA'
}

// Core Models
export interface Locality {
  Id?: number;
  Suburb: string; // max 30 chars
  Postcode: string; // 4 digits
  State: StateCode;
}

export interface ApiLocationModel {
  Name: string; // max 255 chars, required
  Address: string; // max 30 chars, required
  AddressLineTwo?: string; // max 30 chars, optional
  LocalityId?: number; // required if Locality not provided
  Locality?: Locality; // required if LocalityId not provided
}

export interface ApiItemModel {
  ItemType: ItemType; // required
  Description: string; // max 50 chars, required
  Quantity: number; // required
  Height: number; // cm, required
  Width: number; // cm, required
  Length: number; // cm, required
  Weight: number; // kg, required
  Consolidatable?: boolean; // optional
}

// Quote Request - Updated to match API documentation
export interface GetQuoteRequest {
  JobType?: JobType; // optional - if left blank, quotes for all job types will be returned
  BuyerIsBusiness?: boolean; // optional - must be false for Home Delivery (JobType=3)
  BuyerHasForklift?: boolean; // optional
  ReturnAuthorityToLeaveOptions?: boolean; // optional - if true, provides quotes for services where goods can be left without signature (items must be 40kg or less)
  JobDate?: string; // ISO date, optional - date for job pickup
  DepotId?: number; // optional - Big Post ID of depot, if blank closest depot to buyer will be used
  PickupLocation: ApiLocationModel; // required
  BuyerLocation: ApiLocationModel; // required
  Items: ApiItemModel[]; // required
}

// Quote Response
export interface QuoteOption {
  ServiceCode: string;
  ServiceName: string;
  Price: number;
  EstimatedDeliveryDays: number;
  CarrierId: number;
  CarrierName: string;
  Description?: string;
  AuthorityToLeave?: boolean;
  Restrictions?: string[];
}

export interface GetQuoteResponse {
  Success: boolean;
  Quotes?: QuoteOption[];
  ErrorMessage?: string;
  RequestId?: string;
}

// Job Creation - Updated to match API documentation
export interface CreateJobRequest {
  ContactName: string; // max 50 chars, required
  BuyerEmail: string; // email format, required - must match regex: \w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*
  BuyerMobilePhone?: string; // max 10 chars, optional
  BuyerOtherPhone?: string; // max 10 chars, optional
  CarrierId: string; // required
  Reference?: string; // max 50 chars, optional
  JobType: JobType; // required
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

export interface CreateJobResponse {
  Success: boolean;
  JobId?: number;
  CarrierConsignmentNumber?: string;
  ErrorMessage?: string;
  ValidationErrors?: string[];
}

// Suburb Search
export interface SuburbSearchRequest {
  Query: string;
  State?: StateCode;
}

export interface SuburbSearchResult {
  Id: number;
  Suburb: string;
  Postcode: string;
  State: StateCode;
}

export interface SuburbSearchResponse {
  Success: boolean;
  Results?: SuburbSearchResult[];
  ErrorMessage?: string;
}

// Depot Search
export interface DepotSearchRequest {
  BuyerLocation: ApiLocationModel;
  RadiusKm?: number;
}

export interface DepotSearchResult {
  Id: number;
  Name: string;
  Address: string;
  Suburb: string;
  Postcode: string;
  State: StateCode;
  DistanceKm: number;
}

export interface DepotSearchResponse {
  Success: boolean;
  Results?: DepotSearchResult[];
  ErrorMessage?: string;
}

// Job Status
export interface JobStatusRequest {
  JobIds: number[];
}

export interface JobStatusEvent {
  Timestamp: string;
  Status: string;
  Location: string;
  Description: string;
}

export interface JobStatusResult {
  JobId: number;
  CurrentStatus: string;
  StatusHistory: JobStatusEvent[];
}

export interface JobStatusResponse {
  Success: boolean;
  Results?: JobStatusResult[];
  ErrorMessage?: string;
}

// API Error Response
export interface BigPostErrorResponse {
  Success: false;
  ErrorMessage: string;
  ValidationErrors?: string[];
  RequestId?: string;
}

// Client-side form types
export interface AddressFormData {
  name: string;
  address: string;
  addressLineTwo?: string;
  suburb: string;
  postcode: string;
  state: StateCode;
  localityId?: number;
}

export interface ItemFormData {
  itemType: ItemType;
  description: string;
  quantity: number;
  height: number;
  width: number;
  length: number;
  weight: number;
  consolidatable?: boolean;
}

export interface ShippingCalculatorFormData {
  pickupLocation: AddressFormData;
  buyerLocation: AddressFormData;
  items: ItemFormData[];
  jobType: JobType[];
  buyerIsBusiness?: boolean;
  buyerHasForklift?: boolean;
  returnAuthorityToLeaveOptions?: boolean;
  jobDate?: string;
  depotId?: number;
}

// Quote selection
export interface SelectedQuote {
  quote: QuoteOption;
  pickupLocation: AddressFormData;
  buyerLocation: AddressFormData;
  items: ItemFormData[];
  jobType: JobType[];
  buyerIsBusiness?: boolean;
  buyerHasForklift?: boolean;
  authorityToLeave?: boolean;
}
