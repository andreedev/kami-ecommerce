package com.example.demo.utils.validators;

import com.example.demo.service.ProductService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class UniqueProductSkuValidator implements ConstraintValidator<UniqueProductSku, String> {

    @Autowired
    private ProductService productService;

    @Override
    public boolean isValid(String sku, ConstraintValidatorContext context) {
        if (sku == null || sku.trim().isEmpty()) {
            return true;
        }
        return !productService.existsBySku(sku);
    }
}