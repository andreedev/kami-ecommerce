package com.example.demo.service;

import com.example.demo.model.Cart;
import com.example.demo.model.DynamicReport;
import com.example.demo.model.validation.CustomProduct;
import com.example.demo.model.validation.SimpleCartProduct;
import com.example.demo.model.validation.SearchRequest;

import java.util.List;


public interface ProductService {
    DynamicReport<CustomProduct> search(SearchRequest req);
    Cart loadCart(List<SimpleCartProduct> req);
    List<CustomProduct> getFeaturedProducts();
}
