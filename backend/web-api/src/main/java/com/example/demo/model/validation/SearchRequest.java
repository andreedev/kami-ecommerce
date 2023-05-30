package com.example.demo.model.validation;

import com.example.demo.model.Product;
import com.example.demo.utils.validators.AllowedRoles;
import com.example.demo.utils.validators.AllowedSearchRequestOrderFilter;
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
public class SearchRequest {
    @NotBlank(message = "The query is required")
    @Size(min = 3, max = 150, message = "The query must be between 3 and 150 characters.")
    private String query;

    @NotNull(message = "Page is required")
    @Min(value = 1, message = "Page must be greater than or equal to 1")
    @Max(value = 9999, message = "Page must be less than or equal to 9999")
    private Integer page;

    private List<String> categoriesFilter;

    private String brandFilter;

    @AllowedSearchRequestOrderFilter
    private Integer orderFilter;

    private Boolean onSaleFilter;

    @DecimalMin(value = "10.00", message = "The max price filter must be greater than or equal to 10.00")
    @Digits(integer = 10, fraction = 2, message = "The max price filter must have at most 2 decimal places")
    private BigDecimal maxPriceFilter;

    private Boolean inStockFilter;

    private Integer resultsLimit;
}
