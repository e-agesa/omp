// ── Product Types ──
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: "instock" | "outofstock" | "onbackorder";
  stock_quantity: number | null;
  images: ProductImage[];
  categories: ProductCategory[];
  tags: ProductTag[];
  attributes: ProductAttribute[];
  average_rating: string;
  rating_count: number;
  sku: string;
  weight: string;
  dimensions: { length: string; width: string; height: string };
}

export interface ProductImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  image?: ProductImage;
  count?: number;
}

export interface ProductTag {
  id: number;
  name: string;
  slug: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  options: string[];
}

// ── Cart Types ──
export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: string;
  subtotal: string;
  shipping: string;
  tax: string;
}

// ── Order Types ──
export interface Order {
  id: number;
  status: OrderStatus;
  total: string;
  line_items: OrderLineItem[];
  billing: Address;
  shipping: Address;
  payment_method: string;
  date_created: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "on-hold"
  | "completed"
  | "cancelled"
  | "refunded"
  | "failed";

export interface OrderLineItem {
  id: number;
  name: string;
  product_id: number;
  quantity: number;
  subtotal: string;
  total: string;
  price: number;
}

export interface Address {
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

// ── Prescription Types ──
export type PrescriptionStep = "upload" | "insurance" | "callback" | "review";

export interface Prescription {
  id?: number;
  file: File | null;
  preview: string | null;
  insurance_provider: InsuranceProvider;
  wants_pharmacist_callback: boolean;
  notes: string;
  status: PrescriptionStatus;
}

export type InsuranceProvider =
  | "Out-of-pocket"
  | "Jubilee"
  | "GA Insurance"
  | "AAR"
  | "Britam"
  | "CIC"
  | "Madison"
  | "UAP Old Mutual"
  | "Heritage"
  | "NHIF"
  | "Other";

export type PrescriptionStatus =
  | "pending"
  | "pharmacist-reviewing"
  | "dispensing"
  | "out-for-delivery"
  | "delivered";

// ── M-Pesa Types ──
export interface MpesaSTKRequest {
  phone: string;
  amount: number;
  order_id: number;
}

export interface MpesaSTKResponse {
  checkout_request_id: string;
  response_code: string;
  response_description: string;
  merchant_request_id: string;
}

export type MpesaPaymentStatus = "pending" | "completed" | "failed" | "cancelled";

export interface MpesaStatusResponse {
  status: MpesaPaymentStatus;
  receipt_number?: string;
  message: string;
}

// ── Delivery Types ──
export interface DeliveryZone {
  id: string;
  name: string;
  estates: string[];
  eta_minutes: number;
  shipping_cost: number;
}

// ── Search Types ──
export interface SearchResult {
  type: "product" | "symptom" | "article";
  id: number;
  title: string;
  slug: string;
  image?: string;
  price?: string;
}
