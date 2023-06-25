package com.example.demo.model;

import com.example.demo.model.validation.SimplifiedProduct;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerCart {
    private List<SimplifiedProduct> products;
}
