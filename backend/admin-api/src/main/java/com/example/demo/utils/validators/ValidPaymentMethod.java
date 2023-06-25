package com.example.demo.utils.validators;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = ValidPaymentMethodValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidPaymentMethod {
    String message() default "Invalid payment method";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

