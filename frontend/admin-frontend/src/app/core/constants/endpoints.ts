export abstract class Endpoints {
    
    static readonly AUTH: string = `auth`
    static readonly LOGIN: string = `${Endpoints.AUTH}/login`
    static readonly REFRESH: string = `${Endpoints.AUTH}/refresh`
    
    static readonly EMPLOYEE: string = 'admin/employee'
    static readonly GET_EMPLOYEE: string = `${Endpoints.EMPLOYEE}/getEmployee`

    static readonly CUSTOMER: string = 'admin/customer'
    static readonly CUSTOMER_REPORT: string = `${Endpoints.CUSTOMER}/report`

    static readonly PRODUCT: string = 'admin/product'
    static readonly PRODUCT_REPORT: string = `${Endpoints.PRODUCT}/report`
    static readonly PRODUCT_CREATE: string = `${Endpoints.PRODUCT}/create`
}