package com.example.demo.model;

import com.example.demo.utils.validators.ValidDeliveryMethod;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {
    @NotEmpty(message = "The delivery method is required")
    @ValidDeliveryMethod
    private String deliveryMethod;//delivery or in_store_pickup
    private Address shippingAddress;//will be used if deliveryMethod is "delivery"
    private Address salesLocation;//will be used if deliveryMethod is "in_store_pickup"
    private String carrier;//will be used if deliveryMethod is "delivery"
//    @NotNull(message = "The delivery date is required")
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String date;//delivery date datetime
    private LocalDateTime deliveredAt;//delivered order datetime
}