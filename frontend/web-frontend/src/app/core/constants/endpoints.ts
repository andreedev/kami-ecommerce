export abstract class Endpoints {

    static readonly AUTH: string = `auth`
    static readonly LOGIN: string = `${Endpoints.AUTH}/login`
    static readonly REFRESH: string = `${Endpoints.AUTH}/refresh`
    static readonly REGISTER: string = `${Endpoints.AUTH}/register`
    static readonly CHECK_EMAIL: string = `${Endpoints.AUTH}/checkEmail`
    static readonly VERIFY_EMAIL_CODE: string = `${Endpoints.AUTH}/verifyEmailCode`
    static readonly RESET_PASSWORD: string = `${Endpoints.AUTH}/resetPassword`
    static readonly VERIFY_RESET_PASSWORD: string = `${Endpoints.AUTH}/verifyResetPassword`
    static readonly RESOLVE_GOOGLE_AUTH: string = `${Endpoints.AUTH}/resolveGoogleAuth`
    static readonly LINK_TO_GOOGLE_ACCOUNT: string = `${Endpoints.AUTH}/linkToGoogleAccount`
    static readonly SIGN_UP_WITH_GOOGLE: string = `${Endpoints.AUTH}/signUpWithGoogle`

    static readonly EMPLOYEE: string = 'admin/employee'
    static readonly GET_EMPLOYEE: string = `${Endpoints.EMPLOYEE}/getEmployee`

    static readonly CUSTOMER: string = 'customer'
    static readonly PROFILE: string = `${Endpoints.CUSTOMER}/profile`

    static readonly PRODUCT: string = 'product'
    static readonly SEARCH: string = `${Endpoints.PRODUCT}/search`
    static readonly LOAD_GUEST_CART: string = `${Endpoints.PRODUCT}/loadGuestCart`
    static readonly FEATURED: string = `${Endpoints.PRODUCT}/featured`

    static readonly CATEGORY: string = 'category'
    static readonly CATEGORIES: string = `${Endpoints.CATEGORY}/categories`
}