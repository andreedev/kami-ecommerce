package com.example.demo.model;

import com.example.demo.utils.Enums;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.cglib.core.Local;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("products")
public class Product {
    @Id
    private String id;
    private String status;
    private String name;
    private String sku;
    private BigDecimal price;
    private Discount discount;
    private String brand;
    private List<String> categories;
    private List<String> specifications;
    private List<String> mediaUrls;
    private Integer rating;
    private String keywords;
    private Integer stock;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    public Product(String name, String sku, BigDecimal price, Discount discount, String brand, List<String> categories, List<String> specifications, List<String> mediaUrls, Integer rating, String keywords, Integer stock) {
        this.name = name;
        this.sku = sku;
        this.price = price;
        this.discount = discount;
        this.brand = brand;
        this.categories = categories;
        this.specifications = specifications;
        this.mediaUrls = mediaUrls;
        this.rating = rating;
        this.keywords = keywords;
        this.stock = stock;
        this.status = Enums.ProductStatus.CREATED.getValue();
    }
}
