package com.example.demo.service;

import com.example.demo.model.Order;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service()
@Slf4j
public class WebhookServiceImpl implements WebhookService {

    @Value("${web.api.endpoint}")
    private String webApiEndpoint;
    private RestTemplate restTemplate;
    public WebhookServiceImpl() {
        this.restTemplate = new RestTemplate();
    }
    @Override
    public void notifyOrderStatusUpdatedEvent(Order order) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Order> request = new HttpEntity<>(order, headers);
        ResponseEntity<Object> response = restTemplate.exchange(webApiEndpoint+"webhook/order-status-updated-event", HttpMethod.POST, request, Object.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            log.info("Notified successfully");
        } else {
            log.info("Error with notification");
        }
    }
}
