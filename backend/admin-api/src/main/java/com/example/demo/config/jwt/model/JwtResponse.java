package com.example.demo.config.jwt.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class JwtResponse implements Serializable {
    private static final long serialVersionUID = 1L;
    private final String token;
    private final String refreshToken;
}