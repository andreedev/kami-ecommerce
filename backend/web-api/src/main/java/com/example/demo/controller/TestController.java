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
@RequestMapping("test")
public class TestController {
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    WebSocketService webSocketService;
    @GetMapping("encrypt/{str}")
    public String encrypt(@PathVariable("str") String str){
        return passwordEncoder.encode(str);
    }

    @PostMapping(path = "/test-socket")
    public ResponseEntity<String> testSocket(@RequestBody Order req) {
        webSocketService.orderStatusUpdatedEvent(req);
        return new ResponseEntity<String>("ok", HttpStatus.OK);
    }
}
