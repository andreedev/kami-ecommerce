package com.example.demo.utils.validators;

import com.example.demo.utils.Enums;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class AllowedSearchRequestOrderFilterValidator implements ConstraintValidator<AllowedSearchRequestOrderFilter, Integer> {
    @Override
    public boolean isValid(Integer orderFilter, ConstraintValidatorContext context) {
        if (orderFilter == null) {
            return false;
        }
        return Enums.SearchRequestOrderFilter.isValid(orderFilter);
    }
}
