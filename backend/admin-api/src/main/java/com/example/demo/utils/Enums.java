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
        PENDING(1, "pending"),
        PAYMENT_IN_PROCESS(2, "payment_in_process"),
        PAYMENT_CONFIRMED(3, "payment_confirmed"),
        SHIPPED(4, "shipped"),
        DELIVERED(5, "delivered"),
        CANCELED(6, "canceled");
        private final int code;
        private final String value;
    }

    @Getter
    @AllArgsConstructor
    public enum PaymentMethod {
        BANK_TRANSFER(1, "bank_transfer"),
        DIGITAL_WALLET(2, "digital_wallet");
        private final int code;
        private final String value;
    }
    @Getter
    @AllArgsConstructor
    public enum DeliveryMethod {
        DELIVERY(1, "delivery"),
        IN_STORE_PICKUP(2, "in_store_pickup");
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

}
