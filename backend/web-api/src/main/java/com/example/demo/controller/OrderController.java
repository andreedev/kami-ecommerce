package com.example.demo.controller;

import com.example.demo.model.Cart;
import com.example.demo.model.Customer;
import com.example.demo.model.Delivery;
import com.example.demo.model.Order;
import com.example.demo.service.CustomerService;
import com.example.demo.service.OrderService;
import com.example.demo.utils.Utils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController()
@RequestMapping("order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final CustomerService customerService;

    @PostMapping("payment/calculate")
    public Order calculatePayment(@RequestBody Map<String, Object> req){
        log.info("calculatePayment");
        String deliveryMethod = req.get("deliveryMethod").toString();
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Order order = Order.builder()
                .customerId(customer.getId())
                .products(Utils.convertToProductList(customer.getCart().getProducts()))
                .delivery(Delivery.builder()
                        .deliveryMethod(deliveryMethod)
                        .build())
                .build();
        return orderService.calculatePayment(order);
    }
    @PostMapping("create")
    public boolean createOrder(@RequestBody @Valid Order req){
        log.info("createOrder");
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        req.setCustomerId(customer.getId());
        req.setProducts(Utils.convertToProductList(customer.getCart().getProducts()));
        boolean result = orderService.create(req);
        if (result){
            customer.setCart(null);
            customerService.updateCart(customer);
        }
        return result;
    }






}
