package com.example.demo.utils.validators;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = ValidDeliveryMethodValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidDeliveryMethod {
    String message() default "Invalid delivery method";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
