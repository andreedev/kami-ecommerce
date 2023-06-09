package com.example.demo.repository;

import com.example.demo.model.Cart;
import com.example.demo.model.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.CustomProduct;
import com.example.demo.model.validation.SearchRequest;

import java.util.List;

public interface ProductRepository {
    DynamicReport<Product> search(SearchRequest req);
    List<Product> findByListId(List<CustomProduct> req);
}
