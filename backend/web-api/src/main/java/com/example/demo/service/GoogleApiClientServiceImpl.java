package com.example.demo.service;

import com.example.demo.model.googleapi.GoogleUser;
import com.example.demo.model.validation.ResolveGoogleAuthRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
@Slf4j
public class GoogleApiClientServiceImpl implements GoogleApiClientService{

    @Value("${google_client_id}")
    private String googleClientId;
    @Override
    public GoogleUser validateGoogleIdToken(String token) {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
                .setAudience(Collections.singletonList(googleClientId))
                .build();

        GoogleIdToken idToken = null;
        try {
            idToken = verifier.verify(token);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        if (idToken != null) {
            Payload payload = idToken.getPayload();
            // Print user identifier
            String userId = payload.getSubject();

            return GoogleUser.builder()
                    .id(userId)
                    .email(payload.getEmail())
                    .name((String) payload.get("name"))
                    .givenName((String) payload.get("given_name"))
                    .familyName((String) payload.get("given_name"))
                    .picture((String) payload.get("picture"))
                    .emailVerified(payload.getEmailVerified())
                    .build();
        } else {
            log.info("Invalid ID token.");
            return null;
        }
    }
}
