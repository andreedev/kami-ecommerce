package com.example.demo.utils.validators;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = AllowedRolesValidator.class)
public @interface AllowedRoles {
    String message() default "Invalid role. Allowed roles are: ROLE_ADMIN, ROLE_SALES, ROLE_CUSTOMER";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

