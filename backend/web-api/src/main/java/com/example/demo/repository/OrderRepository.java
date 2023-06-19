package com.example.demo.repository;

import com.example.demo.model.Order;

public interface OrderRepository {
    boolean create(Order order);
}
