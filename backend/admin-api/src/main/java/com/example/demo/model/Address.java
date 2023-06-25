package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("addresses")
public class Address {
    @Id
    private String id;
    private String customerId;
    @NotEmpty(message = "The address is required")
    private String line;
    private String reference;
    private String lat;
    private String log;
    private Boolean active;
}
