export abstract class AppRoutes {

    static readonly AUTH: string = "/auth/"
    static readonly LOGIN_COMPONENT_NAME: string = `login`
    static readonly LOGIN_COMPONENT_ROUTE_NAME: string = `${AppRoutes.AUTH}${AppRoutes.LOGIN_COMPONENT_NAME}`

    static readonly HOME_MODULE_NAME: string = `home`
    static readonly HOME_MODULE_ROUTE_NAME: string = `/${AppRoutes.HOME_MODULE_NAME}/`

    static readonly CUSTOMER_MODULE_NAME: string = `customer`
    static readonly CUSTOMER_MODULE_ROUTE_NAME: string = `/${AppRoutes.CUSTOMER_MODULE_NAME}/`

    static readonly CUSTOMER_REPORT_COMPONENT_NAME: string = `report`
    static readonly CUSTOMER_REPORT_COMPONENT_ROUTE_NAME: string = `${AppRoutes.CUSTOMER_MODULE_ROUTE_NAME}${AppRoutes.CUSTOMER_REPORT_COMPONENT_NAME}`

    static readonly PRODUCT_MODULE_NAME: string = `product`
    static readonly PRODUCT_MODULE_ROUTE_NAME: string = `/${AppRoutes.PRODUCT_MODULE_NAME}/`

    static readonly PRODUCT_REPORT_COMPONENT_NAME: string = `report`
    static readonly PRODUCT_REPORT_COMPONENT_ROUTE_NAME: string = `${AppRoutes.PRODUCT_MODULE_ROUTE_NAME}${AppRoutes.PRODUCT_REPORT_COMPONENT_NAME}`

    static readonly PRODUCT_CREATE_COMPONENT_NAME: string = `create`
    static readonly PRODUCT_CREATE_COMPONENT_ROUTE_NAME: string = `${AppRoutes.PRODUCT_MODULE_ROUTE_NAME}${AppRoutes.PRODUCT_CREATE_COMPONENT_NAME}`

    static readonly PRODUCT_UPDATE_COMPONENT_NAME: string = `update`
    static readonly PRODUCT_UPDATE_COMPONENT_ROUTE_NAME: string = `${AppRoutes.PRODUCT_MODULE_ROUTE_NAME}${AppRoutes.PRODUCT_UPDATE_COMPONENT_NAME}`


    static readonly CATEGORY_MODULE_NAME: string = `category`
    static readonly CATEGORY_MODULE_ROUTE_NAME: string = `/${AppRoutes.CATEGORY_MODULE_NAME}/`

    static readonly CATEGORY_REPORT_COMPONENT_NAME: string = `report`
    static readonly CATEGORY_REPORT_COMPONENT_ROUTE_NAME: string = `${AppRoutes.CATEGORY_MODULE_ROUTE_NAME}${AppRoutes.CATEGORY_REPORT_COMPONENT_NAME}`

}