package com.example.demo.repository;

import com.example.demo.model.Customer;
import com.example.demo.model.Order;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class OrderRepositoryImpl implements OrderRepository {
    private final MongoTemplate mongoTemplate;
    @Autowired
    public OrderRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }
    @Override
    public boolean create(Order order) {
        log.info("registerCustomer");
        Order result = mongoTemplate.save(order, "orders");
        return true;
    }
}
