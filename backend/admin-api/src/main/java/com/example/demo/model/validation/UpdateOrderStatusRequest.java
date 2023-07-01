package com.example.demo.model.validation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateOrderStatusRequest {
    @NotNull(message = "The id is required")
    private String id;

    @NotBlank(message = "The newStatus is required")
    private String newStatus;

    private BigDecimal totalPaid;

    private BigDecimal totalRefunded;
}
