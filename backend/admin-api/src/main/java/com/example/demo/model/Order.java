package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("orders")
public class Order {
    @Id
    private String id;
    private String customerId;
    private String paymentId;
    private String paymentStatus;
    private Integer status;
    private List<Product> products;
    private BigDecimal totalPrice;
    private String carrier;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
