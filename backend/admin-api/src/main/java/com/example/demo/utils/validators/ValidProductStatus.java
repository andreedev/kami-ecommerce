package com.example.demo.utils.validators;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ProductStatusValidator.class)
public @interface ValidProductStatus {
    String message() default "Invalid product status. Allowed statuses are: CREATED, PUBLISHED, DISABLED";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

