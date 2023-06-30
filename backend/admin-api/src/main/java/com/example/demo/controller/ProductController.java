package com.example.demo.controller;

import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.ProductReportRequest;
import com.example.demo.model.validation.ProductCreateRequest;
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
        log.info("productReport");
        return productService.getProductReport(req);
    }

    @PostMapping("create")
    ResponseEntity<?> create(@Valid @RequestBody ProductCreateRequest req) {
        log.info("createProduct");
        return ResponseEntity.ok(productService.createProduct(
                Product.builder()
                        .name(req.getName())
                        .sku(req.getSku())
                        .price(req.getPrice())
                        .discount(req.getDiscount()!=null?req.getDiscount().toDiscount():null)
                        .brand(req.getBrand())
                        .categories(req.getCategories())
                        .specifications(req.getSpecifications())
                        .mediaUrls(req.getMediaUrls())
                        .keywords(req.getKeywords())
                        .stock(req.getStock())
                        .isAvailable(req.getIsAvailable())
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
                        .isAvailable(req.getIsAvailable())
                        .name(req.getName())
                        .sku(req.getSku())
                        .price(req.getPrice())
                        .discount(req.getDiscount()!=null?req.getDiscount().toDiscount():null)
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
