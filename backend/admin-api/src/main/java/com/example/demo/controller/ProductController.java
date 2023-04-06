package com.example.demo.controller;

import com.example.demo.model.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.ProductReportRequest;
import com.example.demo.model.validation.ProductSaveRequest;
import com.example.demo.model.validation.ProductUpdateRequest;
import com.example.demo.service.ProductService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;


@Slf4j
@RestController()
@RequestMapping("admin/product")
public class ProductController {
    private final ProductService productService;
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("report")
    public DynamicReport<Product> getCustomerReport(@Valid @RequestBody ProductReportRequest req) throws ParseException {
        log.info("report");
        return productService.getProductReport(req);
    }

    @PostMapping("create")
    ResponseEntity<?> create(@Valid @RequestBody ProductSaveRequest product) {
        log.info("create");
        productService.createProduct(product.toProduct());
        return ResponseEntity.ok(1);
    }

    @PostMapping("update")
    ResponseEntity<?> update(@Valid @RequestBody ProductUpdateRequest product) {
        log.info("update");
        return ResponseEntity.ok(productService.updateProduct(product.toProduct()));
    }


}
