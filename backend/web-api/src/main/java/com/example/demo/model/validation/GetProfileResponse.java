package com.example.demo.model.validation;

import com.example.demo.model.Cart;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetProfileResponse {
    private String name;
    private Cart cart;
}
