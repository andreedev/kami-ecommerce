package com.example.demo.repository;

import com.example.demo.model.Customer;
import com.example.demo.model.validation.VerifyEmailCodeServiceResult;

public interface CustomerRepository {
    boolean existsByEmail(String email);
    boolean existsByDocumentNumber(String documentNumber);
    Customer findById(String id);
    Customer findByUsername(String username);
    Customer findByEmail(String email);
    Customer registerCustomer(Customer customer);
    String generateEmailVerificationCode(String customerId);
    VerifyEmailCodeServiceResult verifyEmailCode(String code);
    void deleteById(String id);
}
