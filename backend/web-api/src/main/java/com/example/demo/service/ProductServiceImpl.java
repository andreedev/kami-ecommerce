package com.example.demo.service;

import com.example.demo.model.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.CustomProduct;
import com.example.demo.model.validation.SearchRequest;
import com.example.demo.repository.ProductRepository;
import com.example.demo.utils.Enums;
import com.example.demo.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Objects;

@Service
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;
    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public DynamicReport<CustomProduct> search(SearchRequest req) {
        DynamicReport<Product> result = productRepository.search(req);
        List<CustomProduct> list = Utils.convertToCustomProductList(result.getData());
        for (CustomProduct product : list) {
            if (product.getDiscount()!=null){
                BigDecimal price = product.getPrice();
                Integer discountPercentage = product.getDiscount().getPercentage();
                BigDecimal discountAmount = price.multiply(BigDecimal.valueOf(discountPercentage)).divide(BigDecimal.valueOf(100));
                BigDecimal priceWithDiscount = price.subtract(discountAmount);
                priceWithDiscount = priceWithDiscount.setScale(2, RoundingMode.HALF_UP);
                product.getDiscount().setPriceWithDiscountApplied(priceWithDiscount);
            }
        }

        DynamicReport<CustomProduct> result2 = new DynamicReport<CustomProduct>(list, result.getTotalPages());

        return result2;
    }
}
