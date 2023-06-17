package com.example.demo.config;

import com.example.demo.model.Customer;
import com.example.demo.service.CustomerService;
import com.example.demo.utils.Enums;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final CustomerService customerService;
    public CustomUserDetailsService(CustomerService customerService) {
        this.customerService = customerService;
    }
    @Override
    public Customer loadUserByUsername(String username) throws UsernameNotFoundException {
        Customer customer = customerService.findByEmail(username);
        if (customer!=null) {
            return customer;
        } else {
            throw new UsernameNotFoundException("Customer not found with username: " + username);
        }
    }
}