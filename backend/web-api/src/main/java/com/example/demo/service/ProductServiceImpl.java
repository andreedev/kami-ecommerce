package com.example.demo.service;

import com.example.demo.model.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.CustomProduct;
import com.example.demo.model.validation.SearchRequest;
import com.example.demo.repository.ProductRepository;
import com.example.demo.utils.Enums;
import com.example.demo.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;
    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Integer save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public DynamicReport<CustomProduct> search(SearchRequest req) {
        DynamicReport<Product> result = productRepository.search(req);
        DynamicReport<CustomProduct> result2 = new DynamicReport<CustomProduct>(Utils.convertToCustomProductList(result.getData()), result.getTotalPages());
        return result2;
    }
}
