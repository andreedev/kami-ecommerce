package com.example.demo.controller;

import com.example.demo.model.Customer;
import com.example.demo.model.DynamicReport;
import com.example.demo.model.validation.CustomerReportRequest;
import com.example.demo.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@Slf4j
@RestController()
@RequestMapping("admin/customer")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    @PostMapping("report")
    public DynamicReport<Customer> report(@Valid @RequestBody CustomerReportRequest req) throws ParseException {
        log.info("report");
        return customerService.getCustomerReport(req);
    }
}
