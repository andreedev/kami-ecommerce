package com.example.demo.model;

import com.example.demo.model.validation.CustomProduct;
import com.example.demo.model.validation.CustomerProduct;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerCart {
    private List<CustomerProduct> products;
}
