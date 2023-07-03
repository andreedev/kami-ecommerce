package com.example.demo.controller;

import com.example.demo.model.Order;
import com.example.demo.websocket.service.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController()
@RequestMapping("webhook")
public class WebhookController {

    @Autowired
    WebSocketService webSocketService;
    @PostMapping(path = "/order-status-updated-event")
    public ResponseEntity<?> orderStatusUpdatedEvent(@RequestBody Order order) {
        webSocketService.orderStatusUpdatedEvent(order);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
