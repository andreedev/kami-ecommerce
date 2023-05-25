export abstract class AppRoutes {

    static readonly AUTH: string = "/auth/"
    static readonly LOGIN_COMPONENT_NAME: string = `login`
    static readonly LOGIN_COMPONENT_ROUTE_NAME: string = `${AppRoutes.AUTH}${AppRoutes.LOGIN_COMPONENT_NAME}`

    static readonly REGISTRATION_COMPONENT_NAME: string = `registration`
    static readonly REGISTRATION_COMPONENT_ROUTE_NAME: string = `${AppRoutes.AUTH}${AppRoutes.REGISTRATION_COMPONENT_NAME}`

    static readonly RESET_PASSWORD_COMPONENT_NAME: string = `reset-password`
    static readonly RESET_PASSWORD_COMPONENT_ROUTE_NAME: string = `${AppRoutes.AUTH}${AppRoutes.RESET_PASSWORD_COMPONENT_NAME}`

    static readonly HOME_MODULE_NAME: string = ''
    static readonly HOME_MODULE_ROUTE_NAME: string = `/${AppRoutes.HOME_MODULE_NAME}`

    static readonly ACCOUNT_MODULE_NAME: string = `account`
    static readonly ACCOUNT_MODULE_ROUTE_NAME: string = `/${AppRoutes.ACCOUNT_MODULE_NAME}`

    static readonly PROFILE_COMPONENT_NAME: string = `profile`
    static readonly PROFILE_COMPONENT_ROUTE_NAME: string = `${AppRoutes.ACCOUNT_MODULE_ROUTE_NAME}${AppRoutes.PROFILE_COMPONENT_NAME}`

    static readonly ORDERS_COMPONENT_NAME: string = `orders`
    static readonly ORDERS_COMPONENT_ROUTE_NAME: string = `${AppRoutes.ACCOUNT_MODULE_ROUTE_NAME}${AppRoutes.ORDERS_COMPONENT_NAME}`

    // static readonly PRODUCT_MODULE_NAME: string = `product`
    // static readonly PRODUCT_MODULE_ROUTE_NAME: string = `/${AppRoutes.PRODUCT_MODULE_NAME}`

    // static readonly PRODUCT_REPORT_COMPONENT_NAME: string = `report`
    // static readonly PRODUCT_REPORT_COMPONENT_ROUTE_NAME: string = `${AppRoutes.PRODUCT_MODULE_ROUTE_NAME}${AppRoutes.PRODUCT_REPORT_COMPONENT_NAME}`

    // static readonly PRODUCT_CREATE_COMPONENT_NAME: string = `create`
    // static readonly PRODUCT_CREATE_COMPONENT_ROUTE_NAME: string = `${AppRoutes.PRODUCT_MODULE_ROUTE_NAME}${AppRoutes.PRODUCT_CREATE_COMPONENT_NAME}`

    // static readonly PRODUCT_UPDATE_COMPONENT_NAME: string = `update`
    // static readonly PRODUCT_UPDATE_COMPONENT_ROUTE_NAME: string = `${AppRoutes.PRODUCT_MODULE_ROUTE_NAME}${AppRoutes.PRODUCT_UPDATE_COMPONENT_NAME}`

}