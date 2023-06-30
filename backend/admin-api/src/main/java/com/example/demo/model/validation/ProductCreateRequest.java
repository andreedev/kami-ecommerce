package com.example.demo.model.validation;

import com.example.demo.utils.validators.UniqueProductName;
import com.example.demo.utils.validators.UniqueProductSku;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.validator.constraints.URL;

import java.math.BigDecimal;
import java.util.List;

@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreateRequest {
    @UniqueProductName
    @NotBlank(message = "The name is required")
    @Size(min = 4, max = 120, message = "The product name must be between 4 and 120 characters.")
    private String name;

    @NotNull(message = "The availability is required")
    private Boolean isAvailable;

    @UniqueProductSku
    @NotBlank(message = "The sku is required")
    private String sku;

    @NotNull(message = "The price is required")
    @DecimalMin(value = "0.01", message = "The price must be greater than or equal to 0.01")
    @Digits(integer = 10, fraction = 2, message = "The price must have at most 2 decimal places")
    private BigDecimal price;

    @Valid
    private DiscountSaveRequest discount;

    @NotBlank(message = "The brand is required")
    private String brand;

    @NotEmpty(message = "The categories list is required")
    @Valid
    private List<@Size(min = 4, message = "Each category must be at least 4 characters long") String> categories;

    @NotEmpty(message = "The specifications list is required")
    @Valid
    private List<@Size(min = 4, message = "Each specification must be at least 4 characters long") String> specifications;

    @NotEmpty(message = "The mediaUrls list is required")
    @Valid
    private List<@URL(message = "Each mediaUrl must be a valid URL") String> mediaUrls;
    @NotNull(message = "Rating is required")
    private String keywords;
    @NotNull(message = "Stock is required")
    @Positive(message = "Stock must be a positive number")
    private Integer stock;
}
