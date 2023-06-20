import { Delivery, Payment, Product } from "."

export interface Order {
    id?: string
    orderNumber?: string
    status?: string
    delivery: Delivery
    payment: Payment
    products?: Product[]
    subTotal?: number
    deliveryCost?: number
    total?: number
}