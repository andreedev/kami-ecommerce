package com.example.demo.model;

import com.example.demo.utils.validators.ValidPaymentMethod;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.springframework.data.annotation.Id;
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
public class Payment {
    @NotEmpty(message = "The payment method is required")
    @ValidPaymentMethod
    private String paymentMethod;
    private String operationCode;
    private String voucher;
    private BigDecimal totalPaid;// the actual total customer paid
    private BigDecimal totalRefunded;//in case customer overpay, there'll be a refund
//    private String paymentGateway;
//    private String token;
    private LocalDateTime updatedAt;
}
