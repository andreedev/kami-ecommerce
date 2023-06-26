package com.example.demo.controller;

import com.example.demo.model.Order;
import com.example.demo.model.Product;
import com.example.demo.model.validation.*;
import com.example.demo.service.OrderService;
import com.example.demo.service.ProductService;
import com.example.demo.utils.Enums;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@Slf4j
@RestController()
@RequestMapping("admin/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    @PostMapping("report")
    public DynamicReport<Order> report(@Valid @RequestBody ReportRequest req) throws ParseException {
        log.info("productReport");
        return orderService.report(req);
    }
    @PostMapping("update")
    ResponseEntity<?> update(@Valid @RequestBody ProductUpdateRequest req) {
        log.info("update");
        return ResponseEntity.ok().build();
    }


}
