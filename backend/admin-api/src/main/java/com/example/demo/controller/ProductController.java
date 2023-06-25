package com.example.demo.controller;

import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.ProductReportRequest;
import com.example.demo.model.validation.ProductSaveRequest;
import com.example.demo.model.validation.ProductUpdateRequest;
import com.example.demo.service.ProductService;
import com.example.demo.utils.Enums;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
    public DynamicReport<Product> report(@Valid @RequestBody ProductReportRequest req) throws ParseException {
        log.info("report");
        return productService.getProductReport(req);
    }

    @PostMapping("create")
    ResponseEntity<?> create(@Valid @RequestBody ProductSaveRequest req) {
        log.info("createProduct");
        return ResponseEntity.ok(productService.createProduct(
                Product.builder()
                        .name(req.getName())
                        .sku(req.getSku())
                        .price(req.getPrice())
                        .discount(req.getDiscount().toDiscount())
                        .brand(req.getBrand()   )
                        .categories(req.getCategories())
                        .specifications(req.getSpecifications())
                        .mediaUrls(req.getMediaUrls())
                        .keywords(req.getKeywords())
                        .stock(req.getStock())
                        .status(Enums.ProductStatus.CREATED.getCode())
                        .rating(0)
                        .build()
        ));
    }

    @PostMapping("update")
    ResponseEntity<?> update(@Valid @RequestBody ProductUpdateRequest req) {
        log.info("update");
        return ResponseEntity.ok(productService.updateProduct(
                Product.builder()
                        .id(req.getId())
                        .status(req.getStatus())
                        .name(req.getName())
                        .sku(req.getSku())
                        .price(req.getPrice())
                        .discount(req.getDiscount().toDiscount())
                        .brand(req.getBrand())
                        .categories(req.getCategories())
                        .specifications(req.getSpecifications())
                        .mediaUrls(req.getMediaUrls())
                        .keywords(req.getKeywords())
                        .stock(req.getStock())
                        .build()
        ));
    }


}
