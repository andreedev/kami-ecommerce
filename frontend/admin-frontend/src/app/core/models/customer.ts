import { Address } from "./address"
import { Product } from "./product"

export interface Customer {
    id?: string
    name?: string
    username?: string
    password?: string
    email?: string
    status?: string
    number?: string
    documentType?: number;
    documentNumber?: string
    addresses?: Array<Address>
    createdAt?: string
    updatedAt?: string
    cart?: Array<Product>
}