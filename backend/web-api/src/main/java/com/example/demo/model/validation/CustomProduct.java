package com.example.demo.model.validation;

import com.example.demo.model.Discount;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomProduct {
    private String id;
    private String name;
    private String sku;
    private BigDecimal price;
    private Discount discount;
    private String brand;
    private List<String> categories;
    private List<String> specifications;
    private List<String> mediaUrls;
    private Integer rating;
    private Integer stock;
}
