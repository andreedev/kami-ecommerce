package com.example.demo.service;

import com.example.demo.model.Customer;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.validation.CustomerReportRequest;
import com.example.demo.repository.AddressRepository;
import com.example.demo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;

@Service()
public class CustomerServiceImpl implements CustomerService{

    @Autowired
    private CustomerRepository customerRepository;
    @Override
    public DynamicReport<Customer> getCustomerReport(CustomerReportRequest req) {
        return customerRepository.getCustomerReport(req);
    }
}
