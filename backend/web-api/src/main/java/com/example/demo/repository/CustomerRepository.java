package com.example.demo.repository;

import com.example.demo.model.Customer;
import com.example.demo.model.validation.CustomerRegistrationRequest;

public interface CustomerRepository {
    Boolean customerExistsByUsernameOrEmailOrDocumentNumber(CustomerRegistrationRequest req);
    Customer findByUsername(String username);
    Customer findByEmail(String email);
    Customer registerCustomer(Customer customer);
    String generateEmailVerificationCode(String customerId);
    Integer verifyEmailCode(String emailVerificationCode);
    Integer checkEmail(String email);


}
