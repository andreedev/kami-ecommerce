package com.example.demo.service;

import com.example.demo.model.Customer;

public interface CustomerService {
    boolean existsByEmail(String email);
    boolean existsByDocumentNumber(String documentNumber);
    Customer findByUsername(String username);
    Customer findByEmail(String email);
    Customer registerCustomer(Customer customer);
    String generateEmailVerificationCode(String customerId);
    Integer verifyEmailCode(String emailVerificationCode);
    Integer checkEmail(String email);

}
