package com.example.demo.service;

import com.example.demo.model.Employee;
public interface EmployeeService {
    Employee findByUsername(String username);
    Integer save(Employee employee);
}
