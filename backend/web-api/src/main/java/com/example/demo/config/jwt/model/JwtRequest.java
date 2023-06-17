package com.example.demo.config.jwt.model;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.io.Serializable;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JwtRequest implements Serializable {
    private static final long serialVersionUID = 2636936156391265891L;
    @NotEmpty(message = "Username is required")
    private String username;
    private String password;
    private String googleIdToken;
}