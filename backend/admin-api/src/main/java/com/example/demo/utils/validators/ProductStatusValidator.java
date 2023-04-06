package com.example.demo.utils.validators;

import com.example.demo.utils.Enums;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

public class ProductStatusValidator implements ConstraintValidator<ValidProductStatus, Integer> {
    private static final Set<Integer> ALLOWED_STATUSES = Collections.unmodifiableSet(Arrays.stream(Enums.ProductStatus.values())
            .map(Enums.ProductStatus::getCode)
            .collect(Collectors.toSet()));

    @Override
    public boolean isValid(Integer status, ConstraintValidatorContext context) {
        return ALLOWED_STATUSES.contains(status);
    }
}
