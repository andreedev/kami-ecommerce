package com.example.demo.repository;

import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.ProductReportRequest;

import java.text.ParseException;
import java.util.List;

public interface ProductRepository {
    DynamicReport<Product> getProductReport(ProductReportRequest req) throws ParseException;
    Product getById(String id);
    List<Product> findByListId(List<Product> req);
    boolean existsById(String id);
    boolean existsByName(String name);
    boolean existsBySku(String sku);
    Product createProduct(Product product);
    Integer updateProduct(Product product);
    boolean updateProductsStock(List<Product> list);
}
