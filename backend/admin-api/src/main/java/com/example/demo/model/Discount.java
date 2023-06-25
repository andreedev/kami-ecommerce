package com.example.demo.model;

import lombok.*;
import org.springframework.data.annotation.Transient;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Discount {
    private Integer percentage;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private BigDecimal priceWithDiscountApplied;

    public Discount(Integer percentage, LocalDateTime startDate, LocalDateTime endDate) {
        this.percentage = percentage;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
