package com.example.demo.model.validation;

import com.example.demo.model.Customer;
import com.example.demo.utils.Enums;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Collections;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSignUpWithEmailRequest extends CustomerSignUpRequest {
    @NotEmpty(message = "The password is required")
    @Size(min = 8, max = 20, message = "The password must be between {min} and {max} characters")
    private String password;
    public Customer buildCustomer(){
        return Customer.builder()
                .name(name)
                .lastName(lastName)
                .password(password)
                .email(email)
                .documentType(documentType)
                .documentNumber(documentNumber)
                .phoneNumber(phoneNumber)
                .addresses(new ArrayList<>())
                .roles(new ArrayList<>(Collections.singleton(Enums.Roles.ROLE_CUSTOMER.getValue())))
                .status(Enums.CustomerStatus.UNVERIFIED_EMAIL.getCode())
                .isLinkedToGoogleAccount(false)
                .build();
    }
}
