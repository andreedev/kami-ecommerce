package com.example.demo.config.jwt;

import com.example.demo.model.Customer;
import com.example.demo.service.CustomerService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static java.rmi.server.LogStream.log;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Slf4j
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final ApplicationContext applicationContext;

    public JwtAuthFilter(JwtUtil jwtUtil, ApplicationContext applicationContext) {
        this.jwtUtil = jwtUtil;
        this.applicationContext = applicationContext;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        //logger.info("request "+ request.getServletPath());
        return new AntPathMatcher().match("/api/auth/**", request.getServletPath())
            || new AntPathMatcher().match("/api/product/**", request.getServletPath())
            || new AntPathMatcher().match("/api/category/**", request.getServletPath())
            || new AntPathMatcher().match("/api/test/**", request.getServletPath());
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String tokenHeader = request.getHeader(AUTHORIZATION);
        String username;
        String token;
        if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
            token = tokenHeader.substring(7);
            try {
                username = jwtUtil.getUsernameFromToken(token);
            } catch (IllegalArgumentException e) {
                System.out.println("Unable to get JWT Token");
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return;
            } catch (ExpiredJwtException e) {
                System.out.println("JWT Token has expired");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        } else {
            System.out.println("Bearer String not found in token");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        if (null != username && SecurityContextHolder.getContext().getAuthentication() == null) {
            Customer customer = applicationContext.getBean("customerService", CustomerService.class).findByEmail(username);
            Customer safeCustomerObj = Customer.builder()
//                    .username(customer.getEmail())
                    .name(customer.getName())
                    .lastName(customer.getLastName())
                    .email(customer.getEmail())
                    .id(customer.getId())
                    .roles(customer.getRoles())
                    .status(customer.getStatus())
                    .cart(customer.getCart())
                    .build();

            if (jwtUtil.validateJwtToken(token, safeCustomerObj.getEmail())) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(safeCustomerObj, null, safeCustomerObj.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else {
                log("JWT Token is invalid");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }
        filterChain.doFilter(request, response);
    }

}