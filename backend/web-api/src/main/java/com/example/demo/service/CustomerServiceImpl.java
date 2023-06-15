package com.example.demo.service;

import com.example.demo.model.Customer;
import com.example.demo.model.validation.VerifyEmailCodeServiceResult;
import com.example.demo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service()
public class CustomerServiceImpl implements CustomerService{

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public boolean existsByEmail(String email) {
        return customerRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByDocumentNumber(String documentNumber) {
        return customerRepository.existsByDocumentNumber(documentNumber);
    }

    @Override
    public Customer findById(String id) {
        return customerRepository.findById(id);
    }

    @Override
    public Customer findByUsername(String username) {
        return customerRepository.findByUsername(username);
    }

    @Override
    public Customer findByEmail(String email) {
        return customerRepository.findByEmail(email);
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
    public VerifyEmailCodeServiceResult verifyEmailCode(String code) {
        return customerRepository.verifyEmailCode(code);
    }

    @Override
    public void deleteById(String id) {
        customerRepository.deleteById(id);
    }

}
