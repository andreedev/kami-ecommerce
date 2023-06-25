package com.example.demo.service;

import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.ProductReportRequest;

import java.text.ParseException;


public interface ProductService {
    DynamicReport<Product> getProductReport(ProductReportRequest req) throws ParseException;
    boolean existsById(String id);
    boolean existsByName(String name);
    boolean existsBySku(String sku);
    Integer createProduct(Product product);
    Integer updateProduct(Product product);
}
