package com.example.demo.model.validation;

import com.example.demo.model.Product;
import com.example.demo.utils.validators.ExistingId;
import com.example.demo.utils.validators.UniqueProductName;
import com.example.demo.utils.validators.UniqueProductSku;
import com.example.demo.utils.validators.ValidProductStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.URL;

import java.math.BigDecimal;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductUpdateRequest {
    @ExistingId
    @NotBlank(message = "The id is required")
    private String id;

    @ValidProductStatus
    @NotNull(message = "The status is required")
    private Integer status;

    @NotBlank(message = "The name is required")
    @Size(min = 4, max = 120, message = "The product name must be between 4 and 120 characters.")
    private String name;

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

    private String keywords;

    @NotNull(message = "Stock is required")
    @Min(value = 0, message = "Stock cannot be negative")
    @Digits(integer = 10, message = "Invalid stock", fraction = 0)
    private Integer stock;
    public Product toProduct() {
        return new Product(id, status, name, sku, price, discount ==  null ? null : discount.toDiscount(), brand, categories, specifications, mediaUrls, keywords, stock);
    }
}
