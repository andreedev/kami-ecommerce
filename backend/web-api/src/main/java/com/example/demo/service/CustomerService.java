package com.example.demo.service;

import com.example.demo.model.Address;
import com.example.demo.model.Customer;
import com.example.demo.model.VerificationCode;
import com.example.demo.model.validation.VerifyEmailCodeServiceResult;
import com.example.demo.model.validation.VerifyResetPasswordRequest;

import java.util.List;

public interface CustomerService {
    boolean existsByEmail(String email);
    boolean existsByDocumentNumber(String documentNumber);
    Customer findById(String id);
    Customer findByUsername(String username);
    Customer findByEmail(String email);
    Customer findByEmail(String email, Integer statusFilter);
    Customer registerCustomer(Customer customer);
    String generateVerificationCode(VerificationCode verificationCode);
    VerifyEmailCodeServiceResult verifyEmailCode(String code);
    boolean verifyResetPassword(VerifyResetPasswordRequest req);
    void deleteById(String id);
    boolean linkToGoogleAccount(Customer customer);
    boolean updateCart(Customer customer);

}
