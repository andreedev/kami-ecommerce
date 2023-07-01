export interface Payment {
    paymentMethod: string
    operationCode?: string
    voucher?: string
    totalPaid?: string
    totalRefunded?: string
}