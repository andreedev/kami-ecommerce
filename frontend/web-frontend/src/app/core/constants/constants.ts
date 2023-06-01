export abstract class Constants {
    static readonly SESSION_TOKEN_NAME: string = 'kamiEccomerceSession';
    static readonly REFRESH_SESSION_TOKEN_NAME: string = 'kamiEccomerceRefreshSession';
    static readonly MAX_UPLOAD_SIZE_IMAGE_IN_MB: number = 5;
    static readonly QUERY_SEARCH_MIN_LENGTH = 3;

    static readonly PRODUCT_MIN_PRICE: number = 1;
    static readonly PRODUCT_MAX_PRICE: number = 5001;
}