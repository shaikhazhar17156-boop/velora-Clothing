export type Gender = 'men' | 'women' | 'kids';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string; // e.g., 'Shirts', 'Kurtas', 'Dresses', 'Jeans', etc.
  subcategory: string; // e.g., 'Casual Shirts', 'Anarkali Sets', 'Slim Jeans'
  gender: Gender;
  price: number;
  originalPrice: number;
  discount: number; // percentage e.g. 25
  rating: number;
  reviews: number;
  sizes: string[];
  colors: ProductColor[];
  images: string[];
  description: string;
  fabric: string;
  fit: string;
  occasion?: string;
  pattern?: string;
  washCare: string;
  isNew: boolean;
  isBestSeller: boolean;
  isSale: boolean;
  stock: number;
  sku: string;
  tags: string[];
  createdAt: string;
}

export interface CartItem {
  id: string; // unique item id (productId + size + color)
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export type OrderStatus = 
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned';

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

export interface OrderTimeline {
  status: OrderStatus;
  date: string;
  description: string;
}

export interface Order {
  id: string; // e.g., 'VEL-89241'
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    phone: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponApplied?: string;
  shippingFee: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending';
  status: OrderStatus;
  date: string;
  estimatedDelivery: string;
  timeline: OrderTimeline[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Array<{
    id: string;
    name: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
  }>;
  savedSizes: {
    menTop?: string;
    menBottom?: string;
    womenTop?: string;
    womenBottom?: string;
    kidsAge?: string;
  };
  ordersCount: number;
  totalSpent: number;
  registeredDate: string;
  status: 'Active' | 'Inactive';
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number; // 10 (%) or 500 (₹)
  minOrderAmount: number;
  maxDiscount?: number;
  expiryDate: string;
  usageCount: number;
  active: boolean;
  description: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  status: 'Approved' | 'Hidden' | 'Pending';
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
  image: string;
  category: 'all' | 'men' | 'women' | 'kids' | 'sale';
  active: boolean;
  startDate?: string;
  endDate?: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'stock' | 'customer' | 'review' | 'system';
  date: string;
  read: boolean;
  link?: string;
}

export type AdminRole = 
  | 'SUPER ADMIN'
  | 'PRODUCT MANAGER'
  | 'ORDER MANAGER'
  | 'CONTENT MANAGER'
  | 'CUSTOMER SUPPORT';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar?: string;
  phone?: string;
}

export interface StoreSettings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  currency: string;
  currencySymbol: string;
  timezone: string;
  taxPercentage: number;
  freeShippingThreshold: number;
  standardShippingFee: number;
}
