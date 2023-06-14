export abstract class Endpoints {

    static readonly AUTH: string = `auth`
    static readonly LOGIN: string = `${Endpoints.AUTH}/login`
    static readonly REGISTER: string = `${Endpoints.AUTH}/register`
    static readonly RESET_PASSWORD: string = `${Endpoints.AUTH}/resetPassword`
    static readonly REFRESH: string = `${Endpoints.AUTH}/refresh`

    static readonly EMPLOYEE: string = 'admin/employee'
    static readonly GET_EMPLOYEE: string = `${Endpoints.EMPLOYEE}/getEmployee`

    static readonly CUSTOMER: string = 'admin/customer'
    static readonly CUSTOMER_REPORT: string = `${Endpoints.CUSTOMER}/report`

    static readonly PRODUCT: string = 'product'
    static readonly SEARCH: string = `${Endpoints.PRODUCT}/search`
    static readonly LOAD_GUEST_CART: string = `${Endpoints.PRODUCT}/loadGuestCart`
    static readonly FEATURED: string = `${Endpoints.PRODUCT}/featured`

    static readonly CATEGORY: string = 'category'
    static readonly CATEGORIES: string = `${Endpoints.CATEGORY}/categories`
}