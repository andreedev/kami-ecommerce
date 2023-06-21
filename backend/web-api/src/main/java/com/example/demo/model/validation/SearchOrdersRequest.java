package com.example.demo.model.validation;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchOrdersRequest {
    private String query;
    private Integer page;
    private String statusFilter;
}
