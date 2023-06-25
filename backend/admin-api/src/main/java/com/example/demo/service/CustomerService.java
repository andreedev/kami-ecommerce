package com.example.demo.service;

import com.example.demo.model.Customer;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.validation.CustomerReportRequest;

import java.text.ParseException;

public interface CustomerService {
    DynamicReport<Customer> getCustomerReport(CustomerReportRequest req);
}
