package com.example.demo.utils.validators;

import com.example.demo.utils.Enums;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;


import java.util.*;
import java.util.stream.Collectors;

public class AllowedRolesValidator implements ConstraintValidator<AllowedRoles, Collection<String>> {
    private static final Set<String> ALLOWED_ROLES = Collections.unmodifiableSet(Arrays.stream(Enums.Roles.values())
            .map(Enums.Roles::getValue)
            .collect(Collectors.toSet()));

    @Override
    public boolean isValid(Collection<String> roles, ConstraintValidatorContext context) {
        return ALLOWED_ROLES.containsAll(roles);
    }
}
