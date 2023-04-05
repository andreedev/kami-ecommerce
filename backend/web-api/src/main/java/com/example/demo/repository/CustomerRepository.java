package com.example.demo.repository;

import com.example.demo.model.Customer;
import com.example.demo.model.validation.CustomerRegistrationRequest;

public interface CustomerRepository {
    Boolean customerExistsByUsernameOrEmailOrDocumentNumber(CustomerRegistrationRequest req);
    Customer findByUsername(String username);
    Customer registerCustomer(Customer customer);
    String generateEmailVerificationCode(String customerId);
    Integer verifyEmail(String emailVerificationCode);

}
