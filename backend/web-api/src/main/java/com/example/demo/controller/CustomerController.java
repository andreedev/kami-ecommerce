package com.example.demo.controller;

import com.example.demo.model.Cart;
import com.example.demo.model.Customer;
import com.example.demo.model.DynamicReport;
import com.example.demo.model.Employee;
import com.example.demo.model.validation.CustomProduct;
import com.example.demo.model.validation.GetProfileResponse;
import com.example.demo.model.validation.SearchRequest;
import com.example.demo.service.CustomerService;
import com.example.demo.service.ProductService;
import jakarta.validation.Valid;
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
    private final ProductService productService;
    @GetMapping("profile")
    public GetProfileResponse getProfile(){
        log.info("getProfile");
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        GetProfileResponse response=  GetProfileResponse.builder().build();
        response.setName(customer.getName());
        response.setCart(productService.loadCart(customer.getCart().getProducts()));
        return response;
    }


}
