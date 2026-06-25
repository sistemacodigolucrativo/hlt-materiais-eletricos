export type Role = 'ADMIN' | 'CUSTOMER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
}

export interface Customer {
  id: string;
  userId: string;
  cpfCnpj: string;
  phone: string;
}

export interface Address {
  id: string;
  customerId: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  categoryId: string;
  brandId: string;
  images: string[];
  stock: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  attributes?: Record<string, string>;
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  customerId?: string;
  items: CartItem[];
  couponId?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercentage?: number;
  discountFixed?: number;
  validUntil: Date;
  active: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus = 'PENDING_PAYMENT' | 'PAID' | 'PROCESSING' | 'INVOICED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: string;
  customerId: string;
  addressId: string;
  items: OrderItem[];
  subtotal: number;
  freightTotal?: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageDesktop: string;
  imageMobile: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  order: number;
  active: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrustBarItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
  active: boolean;
}

export interface InventoryMovement {
  id: string;
  productId: string;
  type: 'IN' | 'OUT' | 'ADJUSTMENT';
  quantity: number;
  reason?: string;
  createdAt: Date;
}
