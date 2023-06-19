package com.example.demo.controller;

import com.example.demo.model.Customer;
import com.example.demo.model.validation.GetProfileResponse;
import com.example.demo.service.CustomerService;
import com.example.demo.service.ProductService;
import com.example.demo.utils.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        response.setAddresses(customer.getAddresses());
        response.setCart(productService.loadCart(Utils.convertToProductList(customer.getCart().getProducts())));
        return response;
    }


}
