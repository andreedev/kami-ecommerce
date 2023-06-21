package com.example.demo.model.validation;

import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DynamicReport<T> {
    private List<T> data;
    private Integer totalPages;
}
