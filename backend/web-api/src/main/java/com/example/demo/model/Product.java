package com.example.demo.model;

import com.example.demo.utils.Enums;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.data.mongodb.core.mapping.FieldType.DECIMAL128;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("products")
public class Product {
    @Id
    private String id;
    private Integer status;
    private String name;
    private String sku;
    @Field(targetType = DECIMAL128)
    private BigDecimal price;
    private Discount discount;
    private String brand;
    private List<String> categories;
    private List<String> specifications;
    private List<String> mediaUrls;
    private Integer rating;
    private String keywords;
    private Integer stock;
    private Integer quantity;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    public Product(String name, String sku, BigDecimal price, Discount discount, String brand, List<String> categories, List<String> specifications, List<String> mediaUrls, String keywords, Integer stock) {
        this.name = name;
        this.sku = sku;
        this.price = price;
        this.discount = discount;
        this.brand = brand;
        this.categories = categories;
        this.specifications = specifications;
        this.mediaUrls = mediaUrls;
        this.keywords = keywords;
        this.stock = stock;
        this.status = Enums.ProductStatus.CREATED.getCode();
        this.rating = 0;
    }

}
