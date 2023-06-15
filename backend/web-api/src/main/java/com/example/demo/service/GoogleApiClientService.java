package com.example.demo.service;

import com.example.demo.model.googleapi.GoogleUser;
import com.example.demo.model.validation.CustomCategory;
import com.example.demo.model.validation.ResolveGoogleAuthRequest;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;


public interface GoogleApiClientService {
    GoogleUser validateGoogleIdToken(String token);
}
