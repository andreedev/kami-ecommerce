package com.example.demo.service;

import com.example.demo.model.Customer;
import com.example.demo.model.Order;
import com.example.demo.model.VerificationCode;
import com.example.demo.model.validation.VerifyEmailCodeServiceResult;
import com.example.demo.model.validation.VerifyResetPasswordRequest;

public interface OrderService {
    boolean create(Order order);
}
