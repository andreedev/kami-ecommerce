package com.example.demo.model;

import com.example.demo.model.validation.SimpleCartProduct;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerCart {
    private List<SimpleCartProduct> products;
}
