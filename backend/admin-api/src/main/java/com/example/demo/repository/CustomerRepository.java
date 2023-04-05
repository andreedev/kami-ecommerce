package com.example.demo.repository;

import com.example.demo.model.Customer;
import com.example.demo.model.DynamicReport;
import com.example.demo.model.validation.CustomerReportRequest;

public interface CustomerRepository {
    DynamicReport<Customer> getCustomerReport(CustomerReportRequest req);
}
