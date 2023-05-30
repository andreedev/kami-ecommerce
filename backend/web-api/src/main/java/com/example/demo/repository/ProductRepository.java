package com.example.demo.repository;

import com.example.demo.model.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.CustomProduct;
import com.example.demo.model.validation.SearchRequest;

import java.util.List;

public interface ProductRepository {
    List<Product> findAll();
    Integer save(Product product);
    DynamicReport<Product> search(SearchRequest req);
}
