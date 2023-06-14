package com.example.demo.controller;

import com.example.demo.model.Customer;
import com.example.demo.model.Employee;
import com.example.demo.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController()
@RequestMapping("customer")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;
    @GetMapping("profile")
    public Customer getProfile(){
        log.info("getProfile");
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return Customer.builder().name(customer.getName()).cart(customer.getCart()).build();
    }

}
