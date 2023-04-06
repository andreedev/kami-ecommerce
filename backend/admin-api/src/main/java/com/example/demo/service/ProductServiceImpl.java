package com.example.demo.service;

import com.example.demo.model.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.ProductReportRequest;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;

@Service
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;
    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public DynamicReport<Product> getProductReport(ProductReportRequest req) throws ParseException {
        return productRepository.getProductReport(req);
    }

    @Override
    public boolean existsById(String id) {
        return productRepository.existsById(id);
    }

    @Override
    public boolean existsByName(String name) {
        return productRepository.existsByName(name);
    }

    @Override
    public boolean existsBySku(String sku) {
        return productRepository.existsBySku(sku);
    }

    @Override
    public Integer createProduct(Product product) {
        return productRepository.createProduct(product);
    }

    @Override
    public Integer updateProduct(Product product) {
        return productRepository.updateProduct(product);
    }
}
