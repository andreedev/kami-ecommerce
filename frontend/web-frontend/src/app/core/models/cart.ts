import { Product } from "./product";

export interface Cart {
    products: Product[];
    subtotal: number;
    totalAmount: number;
  }