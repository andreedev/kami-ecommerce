package com.example.demo.model.validation;

import com.example.demo.model.Customer;
import com.example.demo.utils.validators.UniqueCustomerDocumentNumber;
import com.example.demo.utils.validators.UniqueCustomerEmail;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSignUpRequest {
    @NotEmpty(message = "The name is required")
    @Size(min = 3, max = 20, message = "The name must be between 3 and 20 characters.")
    private String name;
    @NotEmpty(message = "The last name is required")
    @Size(min = 3, max = 30, message = "The last name must be between {min} and {max} characters.")
    private String lastName;
//    @NotEmpty(message = "The username is required")
//    @Size(min = 5, max = 12, message = "The username must be between 5 and 12 characters.")
//    private String username;
    @NotEmpty(message = "The password is required")
    @Size(min = 8, max = 20, message = "The password must be between {min} and {max} characters")
    private String password;
    @NotEmpty(message = "The email is required")
    @Email(message = "The email must be a valid one")
    @UniqueCustomerEmail(message = "El correo ya se encuentra registrado")
    private String email;
    @NotNull(message = "The document type is required")
    private Integer documentType;
    @NotEmpty(message = "The document number is required")
    @UniqueCustomerDocumentNumber(message = "El nro de documento ya se encuentra registrado")
    private String documentNumber;
    @NotEmpty(message = "The phone number is required")
    @Size(min = 9, message = "The phone number must have at least {min} characters")
    private String phoneNumber;
    @Size(min = 6, max = 6, message = "Email verification code must be a 6-character string")
    private String emailVerificationCode;
    private String googleIdToken;
    public Customer toCustomer(){
        return new Customer(name, lastName, password, email, documentType, documentNumber, phoneNumber);
    }

}
