package com.example.demo.service;

import com.example.demo.model.Cart;
import com.example.demo.model.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.SearchRequest;

import java.util.List;


public interface ProductService {
    DynamicReport<Product> search(SearchRequest req);
    Cart loadCart(List<Product> req);
    List<Product> getFeaturedProducts();
}
