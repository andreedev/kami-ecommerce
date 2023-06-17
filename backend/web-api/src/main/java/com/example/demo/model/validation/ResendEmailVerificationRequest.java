package com.example.demo.model.validation;

import com.example.demo.model.Employee;
import com.example.demo.utils.validators.AllowedRoles;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Collection;
@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResendEmailVerificationRequest {
    @NotNull(message = "The email is required")
    @Email(message = "The email must be a valid one")
    private String email;
}
