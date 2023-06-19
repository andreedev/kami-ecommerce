package com.example.demo.service;

import com.example.demo.model.Order;
import com.example.demo.model.Product;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.utils.Enums;
import com.example.demo.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service()
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Override
    public boolean create(Order order) {
        order.setStatus(Enums.OrderStatus.CREATED.getValue());
        order.setOrderNumber(Utils.generateSixDigitsCode());
        List<Product> list = productRepository.findByListId(order.getProducts());
        if (list.isEmpty()) return false;
        Utils.setupProductDiscount(list);
        Utils.recoverCartProductsAmount(order.getProducts(), list);
        order.setSubTotal(Utils.calculateCartSubtotal(list));
        if (order.getDelivery().getDeliveryMethod().equals(Enums.DeliveryMethod.DELIVERY.getValue())){
            order.setDeliveryCost(new BigDecimal(10));
        }
        order.setTotal(order.getSubTotal().add(order.getDeliveryCost()));
        return orderRepository.create(order);
    }
}