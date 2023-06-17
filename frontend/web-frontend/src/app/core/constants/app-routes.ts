export abstract class AppRoutes {

    static readonly AUTH_MODULE_NAME: string = "auth"
    static readonly AUTH_MODULE_ROUTE_NAME: string = `/${AppRoutes.AUTH_MODULE_NAME}/`

    static readonly LOGIN_COMPONENT_NAME: string = `login`
    static readonly LOGIN_COMPONENT_ROUTE_NAME: string = `${AppRoutes.AUTH_MODULE_ROUTE_NAME}/${AppRoutes.LOGIN_COMPONENT_NAME}`

    static readonly SIGN_UP_COMPONENT_NAME: string = `sign-up`
    static readonly SIGN_UP_COMPONENT_ROUTE_NAME: string = `${AppRoutes.AUTH_MODULE_ROUTE_NAME}/${AppRoutes.SIGN_UP_COMPONENT_NAME}`

    static readonly RESET_PASSWORD_COMPONENT_NAME: string = `reset-password`
    static readonly RESET_PASSWORD_COMPONENT_ROUTE_NAME: string = `${AppRoutes.AUTH_MODULE_ROUTE_NAME}/${AppRoutes.RESET_PASSWORD_COMPONENT_NAME}`

    static readonly VERIFY_EMAIL_COMPONENT_NAME: string = `verify-email`
    static readonly VERIFY_EMAIL_COMPONENT_ROUTE_NAME: string = `${AppRoutes.AUTH_MODULE_ROUTE_NAME}/${AppRoutes.VERIFY_EMAIL_COMPONENT_NAME}`

    
    static readonly HOME_MODULE_NAME: string = ''
    static readonly HOME_MODULE_ROUTE_NAME: string = `/${AppRoutes.HOME_MODULE_NAME}`

    static readonly ACCOUNT_MODULE_NAME: string = `account`
    static readonly ACCOUNT_MODULE_ROUTE_NAME: string = `/${AppRoutes.ACCOUNT_MODULE_NAME}`

    static readonly PROFILE_COMPONENT_NAME: string = `profile`
    static readonly PROFILE_COMPONENT_ROUTE_NAME: string = `${AppRoutes.ACCOUNT_MODULE_ROUTE_NAME}/${AppRoutes.PROFILE_COMPONENT_NAME}`

    static readonly ORDERS_COMPONENT_NAME: string = `orders`
    static readonly ORDERS_COMPONENT_ROUTE_NAME: string = `${AppRoutes.ACCOUNT_MODULE_ROUTE_NAME}/${AppRoutes.ORDERS_COMPONENT_NAME}`


    static readonly SEARCH_MODULE_NAME: string = 'search'
    static readonly SEARCH_MODULE_ROUTE_NAME: string = `/${AppRoutes.SEARCH_MODULE_NAME}`

    // static readonly SEARCH_PAGE_COMPONENT_NAME: string = ''
    // static readonly SEARCH_PAGE_COMPONENT_ROUTE_NAME: string =  `${AppRoutes.SEARCH_MODULE_ROUTE_NAME}${AppRoutes.SEARCH_PAGE_COMPONENT_NAME}`

}