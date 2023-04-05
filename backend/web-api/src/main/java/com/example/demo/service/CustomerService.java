package com.example.demo.service;

import com.example.demo.model.Customer;
import com.example.demo.model.validation.CustomerRegistrationRequest;

public interface CustomerService {
    Boolean customerExistsByUsernameOrEmailOrDocumentNumber(CustomerRegistrationRequest req);
    Customer findByUsername(String username);
    Customer registerCustomer(Customer customer);
    String generateEmailVerificationCode(String customerId);
    Integer verifyEmail(String emailVerificationCode);

}
