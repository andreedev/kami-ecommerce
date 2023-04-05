package com.example.demo.service;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ProductService {
    List<Product> findAll();
    Integer save(Product product);
}
