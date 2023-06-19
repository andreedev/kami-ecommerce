package com.example.demo.model.validation;

import com.example.demo.model.Address;
import com.example.demo.model.Cart;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetProfileResponse {
    private String name;
    private Cart cart;
    private List<Address> addresses;
}
