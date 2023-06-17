package com.example.demo.model.validation;

import com.example.demo.model.Customer;
import com.example.demo.utils.Enums;
import com.example.demo.utils.validators.UniqueCustomerEmail;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSignUpWithGoogleRequestExt {
    @NotNull(message = "Invalid token")
    private String googleIdToken;
    @Email(message = "The email must be a valid one")
    @UniqueCustomerEmail(message = "El correo ya se encuentra registrado")
    protected String email;
    public Customer buildCustomer(){
        return null;
//        return Customer.builder()
//                .name(name)
//                .lastName(lastName)
//                .email(email)
//                .documentType(documentType)
//                .documentNumber(documentNumber)
//                .phoneNumber(phoneNumber)
//                .addresses(new ArrayList<>())
//                .roles(new ArrayList<>(Collections.singleton(Enums.Roles.ROLE_CUSTOMER.getValue())))
//                .status(Enums.CustomerStatus.VERIFIED_EMAIL.getCode())
//                .isLinkedToGoogleAccount(true)
//                .build();
    }
}
