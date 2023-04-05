package com.example.demo.service;

import com.example.demo.model.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.ProductReportRequest;

import java.text.ParseException;


public interface ProductService {
    DynamicReport<Product> getProductReport(ProductReportRequest req) throws ParseException;
    boolean existsByName(String name);
    boolean existsBySku(String sku);
    Integer createProduct(Product product);
}
