package com.example.demo.repository;

import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.ProductReportRequest;

import java.text.ParseException;

public interface ProductRepository {
    DynamicReport<Product> getProductReport(ProductReportRequest req) throws ParseException;
    Product getById(String id);
    boolean existsById(String id);
    boolean existsByName(String name);
    boolean existsBySku(String sku);
    Product createProduct(Product product);
    Integer updateProduct(Product product);

}
