export abstract class Endpoints {

    static readonly AUTH: string = `auth`
    static readonly LOGIN: string = `${Endpoints.AUTH}/login`
    static readonly REFRESH: string = `${Endpoints.AUTH}/refresh`

    static readonly EMPLOYEE: string = 'admin/employee'
    static readonly GET_EMPLOYEE: string = `${Endpoints.EMPLOYEE}/get`

    static readonly CUSTOMER: string = 'admin/customer'
    static readonly CUSTOMER_REPORT: string = `${Endpoints.CUSTOMER}/report`
    static readonly FIND_ADDRESSES: string = `${Endpoints.CUSTOMER}/addresses/find`

    static readonly PRODUCT: string = 'admin/product'
    static readonly PRODUCT_REPORT: string = `${Endpoints.PRODUCT}/report`
    static readonly PRODUCT_CREATE: string = `${Endpoints.PRODUCT}/create`
    static readonly PRODUCT_UPDATE: string = `${Endpoints.PRODUCT}/update`

    static readonly CATEGORY: string = 'admin/category'
    static readonly CATEGORY_REPORT: string = `${Endpoints.CATEGORY}/report`
    static readonly CATEGORY_CREATE: string = `${Endpoints.CATEGORY}/create`
    static readonly CATEGORY_UPDATE: string = `${Endpoints.CATEGORY}/update`
    static readonly CATEGORY_DELETE: string = `${Endpoints.CATEGORY}/delete`

    static readonly ORDER: string = 'admin/order'
    static readonly ORDER_REPORT: string = `${Endpoints.ORDER}/report`
    static readonly ORDER_UPDATE: string = `${Endpoints.ORDER}/update`
}
