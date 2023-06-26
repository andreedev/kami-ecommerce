package com.example.demo.model.validation;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReportRequest {
    private String query;
    private Integer page;
    private String statusFilter;
    private DateFilter dateFilter;
}
