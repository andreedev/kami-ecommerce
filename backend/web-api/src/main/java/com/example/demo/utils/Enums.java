package com.example.demo.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class Enums {

    @Getter
    @AllArgsConstructor
    public enum Roles {
        ROLE_ADMIN("ROLE_ADMIN"), ROLE_SALES("ROLE_SALES"), ROLE_CUSTOMER("ROLE_CUSTOMER") ;
        private final String value;
    }

    @Getter
    @AllArgsConstructor
    public enum OrderStatus {
        NEW(1), PROCESSING(2), SHIPPED(3), DELIVERED(4), CANCELLED(5);
        private int code;
    }

    @Getter
    @AllArgsConstructor
    public enum ProductStatus {
        CREATED(1, "created"), PUBLISHED(2, "published"), DISABLED(3, "disabled");
        private final int code;
        private final String value;
    }

    @Getter
    @AllArgsConstructor
    public enum EmployeeStatus {
        ENABLED(1, "enabled"), DISABLED(2, "disabled");
        private final int code;
        private final String value;
    }

    @Getter
    @AllArgsConstructor
    public enum CustomerStatus {
        UNVERIFIED_EMAIL(1, "unverified_email"),
        VERIFIED_EMAIL(2, "verified_email"),
        DISABLED(3, "disabled");
        private final int code;
        private final String value;
    }

    @Getter
    @AllArgsConstructor
    public enum VerificationCodeType {
        EMAIL_VERIFICATION(1, "email_verification"),
        PASSWORD_RESET(2, "password_reset"),
        ;
        private final int code;
        private final String value;
    }

    @Getter
    @AllArgsConstructor
    public enum DocumentType {
        DNI(1, "document_type_dni"),
        CE(4, "document_type_ce"),
        RUC(6, "document_type_ruc"),
        PS(8, "document_type_ps"),
        ;
        private final int code;
        private final String value;
    }

    @Getter
    @AllArgsConstructor
    public enum SearchRequestOrderFilter {
        DEFAULT(1, "default"),
        LOWEST_PRICE(2, "lowest_price"),
        HIGHEST_PRICE(3, "highest_price"),
        RECOMMENDED(4, "recommended"),
        ALPHABETICAL(5, "alphabetical"),
        ;
        private final int code;
        private final String value;

        public static boolean isValid(int code) {
            for (SearchRequestOrderFilter filter : values()) {
                if (filter.getCode() == code) {
                    return true;
                }
            }
            return false;
        }
    }

    @Getter
    @AllArgsConstructor
    public enum AuthenticateWithGoogleResponseCode {
        SUCCESS(1, "success_authentication_with_google"),
        UNREGISTERED(-1, "unregistered"),
        ACCOUNT_NOT_LINKED_TO_GOOGLE(-2, "account_not_linked_to_google"),
        ;
        private final int code;
        private final String value;
    }

    @Getter
    @AllArgsConstructor
    public enum GoogleApiClientCode {
        INVALID_GOOGLE_ID_TOKEN(-350, "invalid_google_id_token"),
        EMAIL_RECEIVED_AND_GOOGLE_EMAIL_DOES_NOT_MATCH(-360, "email_received_and_google_email_does_not_match"),
        ;
        private final int code;
        private final String value;
    }

    @Getter
    @AllArgsConstructor
    public enum CheckEmailResponse {
        EMAIL_VERIFIED(1, "email_verified"),
        UNREGISTERED(-1, "unregistered"),
        UNVERIFIED_EMAIL(-2, "unverified_email"),
        ACCOUNT_LINKED_TO_GOOGLE(-3, "account_linked_to_google"),
        DISABLED_ACCOUNT(-4, "disabled_account"),
        ;
        private final int code;
        private final String value;
    }

    @Getter
    @AllArgsConstructor
    public enum SessionResponseCode {
        SUCCESSFUL_LOGIN(1, "successful_login"),
        INVALID_CREDENTIALS(-1, "invalid_credentials"),
        UNVERIFIED_EMAIL(-2, "unverified_email"),
        ACCOUNT_LINKED_TO_GOOGLE(-3, "account_linked_to_google"),
        DISABLED_ACCOUNT(-4, "disabled_account"),
        ;
        private final int code;
        private final String value;
    }

}
