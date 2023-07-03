package com.example.demo.websocket.controller;

import com.example.demo.websocket.service.WebSocketService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

@EnableScheduling
@Controller
@RequiredArgsConstructor
public class WebSocketController {

    private final WebSocketService webSocketService;

    private final SimpMessagingTemplate template;

//    @Scheduled(fixedRate = 5000)
//    public void bit() {
//        this.template.convertAndSend("/app-out/bit", "bit");
//    }

}
