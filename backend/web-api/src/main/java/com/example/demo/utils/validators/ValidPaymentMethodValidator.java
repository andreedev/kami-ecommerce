package com.example.demo.utils.validators;

import com.example.demo.utils.Enums;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

public class ValidPaymentMethodValidator implements ConstraintValidator<ValidPaymentMethod, String> {
    private static final Set<String> ALLOWED_VALUES = Collections.unmodifiableSet(Arrays.stream(Enums.PaymentMethod.values())
            .map(Enums.PaymentMethod::getValue)
            .collect(Collectors.toSet()));
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return ALLOWED_VALUES.contains(value);
    }
}
