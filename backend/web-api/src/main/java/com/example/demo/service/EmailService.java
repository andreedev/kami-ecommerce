package com.example.demo.service;

public interface EmailService {
    void sendEmail(String receiverEmail, String receiverName, String subject, String htmlPart);
}
