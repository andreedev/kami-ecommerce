package com.example.demo.utils.validators;

import com.example.demo.utils.Enums;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

public class AllowedSearchRequestOrderFilterValidator implements ConstraintValidator<AllowedSearchRequestOrderFilter, Collection<String>> {
    private static final Set<String> ALLOWED_ITEMS = Collections.unmodifiableSet(Arrays.stream(Enums.SearchRequestOrderFilter.values())
            .map(Enums.SearchRequestOrderFilter::getValue)
            .collect(Collectors.toSet()));

    @Override
    public boolean isValid(Collection<String> roles, ConstraintValidatorContext context) {
        return ALLOWED_ITEMS.containsAll(roles);
    }
}
