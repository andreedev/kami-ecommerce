package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.model.validation.ProductSaveRequest;
import com.example.demo.model.validation.SearchRequest;
import com.example.demo.service.ProductService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController()
@RequestMapping("product")
public class ProductController {
    private final ProductService productService;
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("search")
    public ResponseEntity<Integer> search(@RequestBody @Valid SearchRequest req){
        productService.search(req);
        return ResponseEntity.ok(1);
    }
}
