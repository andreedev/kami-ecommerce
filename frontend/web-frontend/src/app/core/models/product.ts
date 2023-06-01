import { Discount } from './discount';
export interface Product {
    id?: string
    status?: string
    name?: string
    sku?: string
    price?: number
    discount?: Discount
    brand?: string
    categories?: Array<string>
    specifications?: Array<string>
    mediaUrls?: Array<string>
    rating?: number
    keywords?: string
    stock?: number
    createdAt?: string;
    updatedAt?: string;

    //doesn't persist
    amount?: number;
}