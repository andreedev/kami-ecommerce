package com.example.demo.model.validation;

import com.example.demo.model.Customer;
import com.example.demo.utils.Enums;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.Collections;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSignUpWithGoogleRequestExt extends CustomerSignUpRequest {
    @NotNull(message = "Invalid token")
    private String googleIdToken;
    public Customer buildCustomer(){
        return Customer.builder()
                .name(name)
                .lastName(lastName)
                .email(email)
                .documentType(documentType)
                .documentNumber(documentNumber)
                .phoneNumber(phoneNumber)
                .addresses(new ArrayList<>())
                .roles(new ArrayList<>(Collections.singleton(Enums.Roles.ROLE_CUSTOMER.getValue())))
                .status(Enums.CustomerStatus.VERIFIED_EMAIL.getCode())
                .isLinkedToGoogleAccount(true)
                .build();
    }
}
