package com.example.demo.model.validation;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSignUpWithGoogleRequest extends CustomerSignUpRequest{
    @NotNull(message = "Invalid token")
    private String googleIdToken;
}
