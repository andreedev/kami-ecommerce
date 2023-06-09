package com.example.demo.model;

import com.example.demo.model.validation.CustomProduct;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    private List<CustomProduct> products;
    // doesn't persist
    private BigDecimal subtotal;
    private Integer totalAmount;
}
