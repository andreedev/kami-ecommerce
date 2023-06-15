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
        REGISTERED(1, "registered"),
        EMAIL_VERIFIED(2, "email_verified"),
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
        DNI(1, "DNI"),
        CE(4, "CARNET EXT."),
        RUC(6, "RUC"),
        PS(8, "PASAPORTE"),
        ;
        private final int code;
        private final String value;
    }

    @Getter
    @AllArgsConstructor
    public enum SearchRequestOrderFilter {
        DEFAULT(1, "default"),
        LOWEST_PRICE(2, "lowest price"),
        HIGHEST_PRICE(3, "highest price"),
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
    public enum GoogleAuthResolverCode {
        SUCCESSFUL_GOOGLE_LOGIN(1, "Successful google login"),
        UNREGISTERED(-1, "Unregistered"),
        ACCOUNT_NOT_LINKED_TO_GOOGLE(-2, "Account not linked to google"),
        ;
        private final int code;
        private final String value;
    }

    @Getter
    @AllArgsConstructor
    public enum GoogleApiClientCode {
        INVALID_GOOGLE_ID_TOKEN(350, "Invalid google id token"),
        EMAIL_RECEIVED_AND_GOOGLE_EMAIL_DOES_NOT_MATCH(360, "Email received and google email does not match"),
        ;
        private final int code;
        private final String value;
    }

}
