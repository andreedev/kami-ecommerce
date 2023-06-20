package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("orders")
public class Order {
    @Id
    private String id;
    private String customerId;
    private String orderNumber;//public for customer
    private String status;
    @Valid
    @NotNull(message = "The delivery object are required")
    private Delivery delivery;
    @Valid
    @NotNull(message = "The payment object are required")
    private Payment payment;
    @Null(message = "The product list is not required")
    private List<Product> products;
    private BigDecimal subTotal;//products total
    private BigDecimal deliveryCost;
    private BigDecimal total;
    private Integer rate;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
