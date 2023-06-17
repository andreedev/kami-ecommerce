package com.example.demo.model.validation;

import com.example.demo.model.Customer;
import com.example.demo.utils.validators.UniqueCustomerDocumentNumber;
import com.example.demo.utils.validators.UniqueCustomerEmail;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSignUpRequest {
    @NotEmpty(message = "The name is required")
    @Size(min = 3, max = 20, message = "The name must be between 3 and 20 characters.")
    protected String name;
    @NotEmpty(message = "The last name is required")
    @Size(min = 3, max = 30, message = "The last name must be between {min} and {max} characters.")
    protected String lastName;
    @NotEmpty(message = "The password is required")
    @Size(min = 8, max = 20, message = "The password must be between {min} and {max} characters")
    protected String password;
    @NotEmpty(message = "The email is required")
    @Email(message = "The email must be a valid one")
    @UniqueCustomerEmail(message = "El correo ya se encuentra registrado")
    protected String email;
    @NotNull(message = "The document type is required")
    protected Integer documentType;
    @NotEmpty(message = "The document number is required")
    @UniqueCustomerDocumentNumber(message = "El nro de documento ya se encuentra registrado")
    protected String documentNumber;
    @NotEmpty(message = "The phone number is required")
    @Size(min = 9, message = "The phone number must have at least {min} characters")
    protected String phoneNumber;
}
