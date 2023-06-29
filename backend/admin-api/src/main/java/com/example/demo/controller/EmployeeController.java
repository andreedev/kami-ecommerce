package com.example.demo.controller;

import com.example.demo.model.Employee;
import com.example.demo.model.validation.EmployeeSaveRequest;
import com.example.demo.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController()
@RequestMapping("admin/employee")
public class EmployeeController {
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("save")
    public Integer save(@Valid @RequestBody EmployeeSaveRequest req) {
        log.info("save");
        return employeeService.save(req.toEmployee());
    }

    @GetMapping("get")
    public Object getEmployee(){
        log.info("getEmployee");
        Employee employee = (Employee) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return Employee.builder().name(employee.getName()).build();
    }


}
