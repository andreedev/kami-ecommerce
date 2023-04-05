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
    public static enum OrderStatus {
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

}
