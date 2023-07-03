package com.example.demo.websocket.service;

import com.example.demo.model.Order;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class WebSocketService {
    @Autowired
    private SimpMessagingTemplate template;

    public void orderStatusUpdatedEvent(Order req) {
        log.info("order status with id: "+req.getId()+ " changed to "+req.getStatus());
        this.template.convertAndSend("/app-out/order-status-updated-event/"+req.getCustomerId(),
                Order.builder()
                        .status(req.getStatus())
                        .orderNumber(req.getOrderNumber())
                        .build()
        );
    }
}
