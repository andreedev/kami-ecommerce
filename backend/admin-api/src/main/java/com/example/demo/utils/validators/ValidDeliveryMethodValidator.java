package com.example.demo.utils.validators;

import com.example.demo.utils.Enums;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

public class ValidDeliveryMethodValidator implements ConstraintValidator<ValidDeliveryMethod, String> {
    private static final Set<String> ALLOWED_DELIVERY_METHODS = Collections.unmodifiableSet(Arrays.stream(Enums.DeliveryMethod.values())
            .map(Enums.DeliveryMethod::getValue)
            .collect(Collectors.toSet()));
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return ALLOWED_DELIVERY_METHODS.contains(value);
    }
}
