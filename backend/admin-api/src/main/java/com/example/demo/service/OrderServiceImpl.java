package com.example.demo.service;

import com.example.demo.model.Order;
import com.example.demo.model.Product;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.validation.ProductReportRequest;
import com.example.demo.model.validation.ReportRequest;
import com.example.demo.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.text.ParseException;

@Service
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public DynamicReport<Order> report(ReportRequest req) throws ParseException {
        return orderRepository.report(req);
    }

    @Override
    public Integer update(Order order) {
        return orderRepository.update(order);
    }
}
