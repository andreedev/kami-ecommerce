package com.example.demo.controller;

import com.example.demo.model.Customer;
import com.example.demo.model.Order;
import com.example.demo.service.OrderService;
import com.example.demo.utils.Utils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController()
@RequestMapping("order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    @PostMapping("create")
    public boolean createOrder(@RequestBody @Valid Order req){
        log.info("createOrder");
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        req.setCustomerId(customer.getId());
        req.setProducts(Utils.convertToProductList(customer.getCart().getProducts()));
        return orderService.create(req);
    }


}
