package com.example.demo.model;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    private String id;
    @NotEmpty(message = "The address is required")
    private String line;
    private String reference;
    private String lat;
    private String log;
    private Integer status;
}
