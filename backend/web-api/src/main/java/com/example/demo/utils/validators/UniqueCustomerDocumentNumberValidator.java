package com.example.demo.utils.validators;

import com.example.demo.service.CustomerService;
import com.example.demo.service.ProductService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class UniqueCustomerDocumentNumberValidator implements ConstraintValidator<UniqueCustomerDocumentNumber, String> {

    @Autowired
    private CustomerService customerService;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        value=value.trim();
        if (value == null || value.isEmpty()) {
            return true;
        }
        return !customerService.existsByDocumentNumber(value);
    }
}