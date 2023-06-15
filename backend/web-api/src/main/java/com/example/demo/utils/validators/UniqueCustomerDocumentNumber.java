package com.example.demo.utils.validators;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = UniqueCustomerDocumentNumberValidator.class)
@Target({ ElementType.FIELD, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueCustomerDocumentNumber {

    String message() default "The document number is already registered.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
