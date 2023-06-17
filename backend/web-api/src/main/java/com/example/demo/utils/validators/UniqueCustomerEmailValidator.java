package com.example.demo.utils.validators;

import com.example.demo.model.Customer;
import com.example.demo.service.CustomerService;
import com.example.demo.utils.Enums;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class UniqueCustomerEmailValidator implements ConstraintValidator<UniqueCustomerEmail, String> {

    @Autowired
    private CustomerService customerService;
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.trim().isEmpty()) {
            return true;
        }
        return !customerService.existsByEmail(value);
    }
}