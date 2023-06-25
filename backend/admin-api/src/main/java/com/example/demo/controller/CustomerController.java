package com.example.demo.controller;

import com.example.demo.model.Address;
import com.example.demo.model.Customer;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.validation.CustomerReportRequest;
import com.example.demo.service.AddressService;
import com.example.demo.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController()
@RequestMapping("admin/customer")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;
    private final AddressService addressService;
    @PostMapping("report")
    public DynamicReport<Customer> report(@Valid @RequestBody CustomerReportRequest req){
        log.info("report");
        return customerService.getCustomerReport(req);
    }

    @PostMapping("addresses/find")
    public List<Address> findAddresses(@RequestBody List<Address> request) {
        log.info("findAddresses");
        return addressService.findAddresses(request);
    }
}
