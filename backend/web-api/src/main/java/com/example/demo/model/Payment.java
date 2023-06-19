package com.example.demo.model;

import com.example.demo.utils.validators.ValidPaymentMethod;
import jakarta.validation.constraints.NotEmpty;
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
public class Payment {
    @NotEmpty(message = "The payment method is required")
    @ValidPaymentMethod
    private String paymentMethod;
    private String operationCode;
    private String voucher;
    private BigDecimal total;
//    private String paymentGateway;
//    private String token;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
