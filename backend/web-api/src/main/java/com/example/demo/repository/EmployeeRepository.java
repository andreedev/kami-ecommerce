package com.example.demo.repository;

import com.example.demo.model.Employee;
import com.example.demo.model.Product;

import java.util.List;

public interface EmployeeRepository {
    Employee findByUsername(String username);
    Integer save(Employee employee);
}
