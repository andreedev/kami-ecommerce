package com.example.demo.repository;

import com.example.demo.model.Employee;
import com.example.demo.model.Product;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class EmployeeRepositoryImpl implements EmployeeRepository {
    private final MongoTemplate mongoTemplate;

    @Autowired
    public EmployeeRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Employee findByUsername(String username) {
        Query query = new Query(Criteria.where("username").is(username));
        return mongoTemplate.findOne(query, Employee.class, "employees");
    }

    @Override
    public Integer save(Employee employee) {
        log.info("save");
        Employee result = mongoTemplate.save(employee, "employees");
        return 1;
    }
}
