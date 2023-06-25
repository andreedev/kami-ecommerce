export interface SearchRequest {
    query?: string
    page?: number
    categoriesFilter: Array<string>
    brandFilter?: string
    orderFilter?: number
    onSaleFilter?: boolean
    brand?: string
    maxPriceFilter?: number
    inStockFilter?: boolean
    pageSize?: number
}
