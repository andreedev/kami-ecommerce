package com.example.demo.service;

import com.example.demo.model.Customer;
import com.example.demo.model.validation.CustomerRegistrationRequest;
import com.example.demo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Transient;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service()
public class CustomerServiceImpl implements CustomerService{

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Boolean customerExistsByUsernameOrEmailOrDocumentNumber(CustomerRegistrationRequest req) {
        return customerRepository.customerExistsByUsernameOrEmailOrDocumentNumber(req);
    }

    @Override
    public Customer findByUsername(String username) {
        return customerRepository.findByUsername(username);
    }

    @Override
    public Customer registerCustomer(Customer customer) {
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        return customerRepository.registerCustomer(customer);
    }

    @Override
    public String generateEmailVerificationCode(String customerId) {
        return customerRepository.generateEmailVerificationCode(customerId);
    }

    @Override
    public Integer verifyEmail(String emailVerificationCode) {
        return customerRepository.verifyEmail(emailVerificationCode);
    }

}
