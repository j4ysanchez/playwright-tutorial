export type Size = "S" | "M" | "L";

export interface Topping {
  id: string;
  name: string;
  price: number;
}

export interface Pizza {
  id: string;
  slug: string;
  name: string;
  description: string;
  vegetarian: boolean;
  basePrices: Record<Size, number>;
  color: string;
}

export interface OrderItemInput {
  pizzaId: string;
  size: Size;
  toppingIds: string[];
  quantity: number;
}

export interface OrderItem extends OrderItemInput {
  pizzaName: string;
  unitPrice: number;
  lineTotal: number;
}

export interface CustomerInfo {
  name: string;
  address: string;
  phone: string;
}

export interface OrderInput {
  items: OrderItemInput[];
  customer: CustomerInfo;
  couponCode?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customer: CustomerInfo;
  couponCode?: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: "received";
  createdAt: string;
}
