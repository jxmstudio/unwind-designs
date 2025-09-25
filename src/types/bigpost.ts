// BigPost API Types - Generated from Swagger specification
// https://api.bigpost.com.au/swagger/index.html

// Enums
export enum JobType {
  DEPOT = 1,
  DIRECT = 2,
  HOME_DELIVERY = 3
}

export enum ItemType {
  CARTON = 0,
  SKID = 1,
  PALLET = 2,
  PACK = 3,
  CRATE = 4,
  ROLL = 5,
  SATCHEL = 6,
  STILLAGE = 7,
  TUBE = 8,
  BAG = 9
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

// Quote Request
export interface GetQuoteRequest {
  JobType?: JobType; // optional - if left blank, quotes for all job types will be returned
  BuyerIsBusiness?: boolean; // optional
  BuyerHasForklift?: boolean; // optional
  ReturnAuthorityToLeaveOptions?: boolean; // optional
  JobDate?: string; // ISO date, optional
  DepotId?: number; // optional
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

// Job Creation
export interface CreateJobRequest {
  ContactName: string; // max 50 chars, required
  BuyerEmail: string; // email format, required
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
  ServiceCode?: string; // optional
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
