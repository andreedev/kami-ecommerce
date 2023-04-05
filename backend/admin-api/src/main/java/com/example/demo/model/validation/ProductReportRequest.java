package com.example.demo.model.validation;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductReportRequest {
    private String query;
    private Integer page;
    private Integer statusFilter;
    @NotNull(message = "dateFilter must not be null")
    @Valid
    private DateFilter dateFilter;
}
