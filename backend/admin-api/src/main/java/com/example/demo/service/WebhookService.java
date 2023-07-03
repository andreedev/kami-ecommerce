package com.example.demo.service;

import com.example.demo.model.Order;

public interface WebhookService {
    void notifyOrderStatusUpdatedEvent(Order order);
}
