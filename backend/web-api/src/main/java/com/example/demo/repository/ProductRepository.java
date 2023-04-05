package com.example.demo.repository;

import com.example.demo.model.Product;

import java.util.List;

public interface ProductRepository {
    List<Product> findAll();
    Integer save(Product product);
}
