package com.example.demo.model.validation;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomCategory {
    private String name;
    private String mediaUrl;
}
