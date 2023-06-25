package com.example.demo.config.jwt.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class JwtTokenRefreshRequest implements Serializable {
    private static final long serialVersionUID = 1L;
    private String refreshToken;
}