package com.example.demo.service;

import com.example.demo.model.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.CustomProduct;
import com.example.demo.model.validation.SearchRequest;

import java.util.List;


public interface ProductService {
    List<Product> findAll();
    Integer save(Product product);
    DynamicReport<CustomProduct> search(SearchRequest req);
}
