package com.example.demo.model.validation;

import com.example.demo.model.Discount;
import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter @Setter
public class DiscountSaveRequest {
    @NotNull(message = "Percentage is required")
    @Min(value = 0, message = "Percentage must be greater than or equal to zero")
    @Max(value = 100, message = "Percentage must be less than or equal to 100")
    private Integer percentage;

    @NotNull(message = "Start date is required")
    @FutureOrPresent(message = "Start date must be in the present or future")
    private LocalDateTime startDate;

    @NotNull(message = "End date is required")
    @Future(message = "End date must be in the future")
    private LocalDateTime endDate;

    public Discount toDiscount() {
        return new Discount(percentage, startDate, endDate);
    }
}
