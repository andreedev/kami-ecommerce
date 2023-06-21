package com.example.demo.repository;

import com.example.demo.model.Customer;
import com.example.demo.model.Order;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.SearchOrdersRequest;
import com.example.demo.model.validation.SearchRequest;

import java.util.List;

public interface ProductRepository {
    DynamicReport<Product> search(SearchRequest req);
    List<Product> findByListId(List<Product> req);
}
