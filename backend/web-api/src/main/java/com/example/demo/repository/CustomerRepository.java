package com.example.demo.repository;

import com.example.demo.model.Customer;

public interface CustomerRepository {
    boolean existsByEmail(String email);
    boolean existsByDocumentNumber(String documentNumber);
    Customer findByUsername(String username);
    Customer findByEmail(String email);
    Customer registerCustomer(Customer customer);
    String generateEmailVerificationCode(String customerId);
    Integer verifyEmailCode(String emailVerificationCode);
    Integer checkEmail(String email);


}
