package com.example.demo.config.jwt.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
public class JwtTokenRefreshRequest implements Serializable {
    private static final long serialVersionUID = 1L;
    private String refreshToken;
}