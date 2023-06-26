package com.example.demo.repository;

import com.example.demo.model.Order;
import com.example.demo.model.Product;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.validation.ProductReportRequest;
import com.example.demo.model.validation.ReportRequest;

import java.text.ParseException;

public interface OrderRepository {
    DynamicReport<Order> report(ReportRequest req) throws ParseException;
    Integer update(Order order);

}
