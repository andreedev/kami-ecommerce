export abstract class Endpoints {

    static readonly AUTH: string = `auth`
    static readonly LOGIN: string = `${Endpoints.AUTH}/login`
    static readonly REFRESH: string = `${Endpoints.AUTH}/refresh`
    static readonly REGISTER: string = `${Endpoints.AUTH}/register`
    static readonly CHECK_EMAIL: string = `${Endpoints.AUTH}/checkEmail`
    static readonly VERIFY_EMAIL_CODE: string = `${Endpoints.AUTH}/verifyEmailCode`
    static readonly RESEND_VERIFICATION_EMAIL: string = `${Endpoints.AUTH}/resendVerificationEmail`
    static readonly RESET_PASSWORD: string = `${Endpoints.AUTH}/resetPassword`
    static readonly VERIFY_RESET_PASSWORD: string = `${Endpoints.AUTH}/verifyResetPassword`
    static readonly AUTHENTICATE_WITH_GOOGLE: string = `${Endpoints.AUTH}/authenticateWithGoogle`
    static readonly LINK_TO_GOOGLE_ACCOUNT: string = `${Endpoints.AUTH}/linkToGoogleAccount`
    static readonly SIGN_UP_WITH_GOOGLE: string = `${Endpoints.AUTH}/signUpWithGoogle`

    static readonly CUSTOMER: string = 'customer'
    static readonly PROFILE: string = `${Endpoints.CUSTOMER}/profile`
    static readonly SAVE_ADDRESS: string = `${Endpoints.CUSTOMER}/address/save`
    static readonly DELETE_ADDRESS: string = `${Endpoints.CUSTOMER}/address/delete`

    static readonly CART: string = 'cart'
    static readonly UPDATE_CART: string = `${Endpoints.CART}/update`

    static readonly PRODUCT: string = 'product'
    static readonly SEARCH: string = `${Endpoints.PRODUCT}/search`
    static readonly LOAD_GUEST_CART: string = `${Endpoints.PRODUCT}/loadGuestCart`
    static readonly FEATURED: string = `${Endpoints.PRODUCT}/featured`

    static readonly CATEGORY: string = 'category'
    static readonly CATEGORIES: string = `${Endpoints.CATEGORY}/categories`

    static readonly ORDER: string = 'order'
    static readonly CALCULATE_PAYMENT: string = `${Endpoints.ORDER}/payment/calculate`
    static readonly CREATE_ORDER: string = `${Endpoints.ORDER}/create`
    static readonly SEARCH_ORDERS: string = `${Endpoints.ORDER}/search`
    static readonly PROCESS_ORDER: string = `${Endpoints.ORDER}/process`
}