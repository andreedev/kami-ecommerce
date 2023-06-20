import { Address } from "./address"

export interface Delivery {
    deliveryMethod: string
    shippingAddress: Address
    salesLocation?: Address
    carrier?: string
    date?: string
    deliveredAt?: string
}