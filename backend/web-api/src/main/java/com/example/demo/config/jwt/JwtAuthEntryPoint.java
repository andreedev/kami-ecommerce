package com.example.demo.config.jwt;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.Serializable;

@Slf4j
@Component
public class JwtAuthEntryPoint implements AuthenticationEntryPoint, Serializable {
    private static final long serialVersionUID = 1L;
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        try {
            // Check the type of exception and set the appropriate HTTP status code
            if (authException instanceof InsufficientAuthenticationException) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized: Authentication token was not found");
            } else if (authException instanceof DisabledException) {
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Forbidden: User account has been disabled");
            } else if (authException instanceof LockedException) {
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Forbidden: User account has been locked");
            } else if (authException instanceof BadCredentialsException) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized: Invalid username or password");
            } else {
                // For any other type of exception, set the HTTP status code to 500 Internal Server Error
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            }
        } catch (IOException e) {
            log.error("Exception while handling authentication error: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Unexpected exception while handling authentication error: {}", e.getMessage());
            throw new ServletException(e);
        }
    }
}
