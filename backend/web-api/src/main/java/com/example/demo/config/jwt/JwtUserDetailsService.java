package com.example.demo.config.jwt;

import com.example.demo.model.Customer;
import com.example.demo.model.Employee;
import com.example.demo.service.CustomerService;
import com.example.demo.service.EmployeeService;
import com.example.demo.utils.Enums;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class JwtUserDetailsService implements UserDetailsService {
    private final PasswordEncoder passwordEncoder;
    private final ApplicationContext applicationContext;

    @Autowired
    @Lazy
    public JwtUserDetailsService(PasswordEncoder passwordEncoder, ApplicationContext applicationContext) {
        this.passwordEncoder = passwordEncoder;
        this.applicationContext = applicationContext;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Customer customer = applicationContext.getBean("customerService", CustomerService.class).findByUsername(username);
        if (customer!=null && customer.getStatus()==Enums.CustomerStatus.EMAIL_VERIFIED.getCode()) {
            return new org.springframework.security.core.userdetails.User(customer.getUsername(), customer.getPassword(), customer.getAuthorities());
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}