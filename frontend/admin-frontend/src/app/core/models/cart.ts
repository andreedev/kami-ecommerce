import { Product } from "./product";

export interface Cart {
    products: Product[];

    // doesn't persist
    subtotal: number;
    totalAmount: number;
  }