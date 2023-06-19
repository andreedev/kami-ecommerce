package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.model.validation.SimplifiedProduct;
import com.example.demo.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController()
@RequestMapping("cart")
@RequiredArgsConstructor
public class CartController {
    private final CustomerService customerService;
    @PostMapping("update")
    public boolean updateCart(@RequestBody List<SimplifiedProduct> request){
        log.info("updateCart");
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        customer.setCart(new CustomerCart(request));
        return customerService.updateCart(customer);
    }

}
