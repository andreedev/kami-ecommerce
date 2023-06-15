package com.example.demo.utils.validators;

import com.example.demo.service.ProductService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class ExistingProductIdValidator implements ConstraintValidator<ExistingProductId, String> {

    @Autowired
    private ProductService productService;
    @Override
    public boolean isValid(String id, ConstraintValidatorContext context) {
        if (id == null) {
            return true;
        }
        return productService.existsById(id);
    }
}
