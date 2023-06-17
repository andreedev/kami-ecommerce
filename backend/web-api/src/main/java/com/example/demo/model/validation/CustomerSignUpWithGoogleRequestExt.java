package com.example.demo.model.validation;

import com.example.demo.model.Customer;
import com.example.demo.utils.Enums;
import com.example.demo.utils.validators.UniqueCustomerDocumentNumber;
import com.example.demo.utils.validators.UniqueCustomerEmail;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Collections;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSignUpWithGoogleRequestImpl extends CustomerSignUpRequest {
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
