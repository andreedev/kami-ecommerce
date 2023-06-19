package com.example.demo.controller;

import com.example.demo.model.Address;
import com.example.demo.model.Customer;
import com.example.demo.model.Order;
import com.example.demo.model.validation.GetProfileResponse;
import com.example.demo.service.CustomerService;
import com.example.demo.service.ProductService;
import com.example.demo.utils.Utils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
        response.setAddresses(customerService.loadAddresses(customer.getAddresses()));
        response.setCart(productService.loadCart(Utils.convertToProductList(customer.getCart().getProducts())));
        return response;
    }

    @PostMapping("address/save")
    public boolean saveAddress(@RequestBody @Valid Address req){
        log.info("saveAddress");
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return customerService.saveAddress(customer, req);
    }

    @DeleteMapping("address/delete")
    public boolean deleteAddress(@RequestBody Map<String, Object> req){
        log.info("deleteAddress");
        String addressId = req.get("id").toString();
        if (!ObjectId.isValid(addressId)) return false;
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return customerService.deleteAddress(customer, addressId);
    }


}
