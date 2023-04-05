package com.example.demo.config.jwt;

import com.example.demo.model.Employee;
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

import java.util.Objects;

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
        Employee employee = applicationContext.getBean("employeeService", EmployeeService.class).findByUsername(username);
        if (employee!=null && Objects.equals(employee.getStatus(), Enums.EmployeeStatus.ENABLED.getValue())) {
            return new org.springframework.security.core.userdetails.User(employee.getUsername(), employee.getPassword(), employee.getAuthorities());
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}