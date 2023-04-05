package com.example.demo.model.validation;

import com.example.demo.model.Customer;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRegistrationRequest {
    @NotEmpty(message = "The name is required")
    @Size(min = 3, max = 20, message = "The name must be between 3 and 20 characters.")
    private String name;
    @NotEmpty(message = "The username is required")
    @Size(min = 5, max = 12, message = "The username must be between 5 and 12 characters.")
    private String username;
    @NotEmpty(message = "The password is required")
    @Size(min = 8, max = 20, message = "The password must be between {min} and {max} characters")
    private String password;
    @NotEmpty
    @Email(message = "The email must be a valid one")
    private String email;
    @NotNull(message = "The document type is required")
    private Integer documentType;
    @NotEmpty(message = "The document number is required")
    private String documentNumber;
    @NotEmpty(message = "The phone number is required")
    @Size(min = 9, message = "The phone number must have at least {min} characters")
    private String phoneNumber;
    @Size(min = 6, max = 6, message = "Email verification code must be a 6-character string")
    private String emailVerificationCode;
    public Customer toCustomer(){
        return new Customer(name, username, password, email, documentType, documentNumber, phoneNumber);
    }

}
