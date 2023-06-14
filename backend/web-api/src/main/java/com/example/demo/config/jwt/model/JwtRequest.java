package com.example.demo.config.jwt.model;

import jakarta.validation.constraints.NotEmpty;

import java.io.Serializable;

public class JwtRequest implements Serializable {
    private static final long serialVersionUID = 2636936156391265891L;
    @NotEmpty
    private String username;
    private String password;
    private Boolean googleLogin;
    private String googleId;
    private String googleIdToken;
    public JwtRequest() {
    }
    public JwtRequest(String username, String password) {
        super();
        this.username = username; this.password = password;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}