package com.example.demo.model.validation;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DateFilter {
    @NotNull(message = "startDate must not be null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String startDate;
    @NotNull(message = "startDate must not be null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String endDate;
}
