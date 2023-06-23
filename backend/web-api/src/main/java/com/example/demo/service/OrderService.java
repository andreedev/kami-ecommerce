package com.example.demo.service;

import com.example.demo.model.Customer;
import com.example.demo.model.Order;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.validation.SearchOrdersRequest;

public interface OrderService {
    Order create(Order order);
    Order calculatePayment(Order order);
    DynamicReport<Order> searchOrders(Customer customer, SearchOrdersRequest request);
    Order findById(String id);
    boolean update(Order order);
}
