package com.example.demo.model.validation;

import jakarta.validation.Valid;
import lombok.*;

import jakarta.validation.constraints.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerReportRequest {
    private String query;
    private Integer page;
    private String statusFilter;
    @NotNull(message = "dateFilter must not be null")
    @Valid
    private DateFilter dateFilter;
}
