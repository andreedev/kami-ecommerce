package com.example.demo.controller;

import com.example.demo.config.jwt.JwtUserDetailsService;
import com.example.demo.config.jwt.JwtUtil;
import com.example.demo.config.jwt.model.JwtRequest;
import com.example.demo.config.jwt.model.JwtResponse;
import com.example.demo.config.jwt.model.JwtTokenRefreshRequest;
import com.example.demo.model.Employee;
import com.example.demo.model.validation.SessionResponse;
import com.example.demo.service.EmployeeService;
import com.example.demo.utils.Enums;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Slf4j
@RestController()
@RequestMapping("auth")
public class AuthController {

    private final JwtUserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final EmployeeService employeeService;

    @Autowired
    public AuthController(JwtUserDetailsService userDetailsService, AuthenticationManager authenticationManager, JwtUtil jwtUtil, EmployeeService employeeService) {
        this.userDetailsService = userDetailsService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.employeeService = employeeService;
    }

    @PostMapping("login")
    public ResponseEntity<SessionResponse> createToken(@RequestBody JwtRequest request) {
        Authentication authentication;
        SessionResponse sessionResponse = new SessionResponse();
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (BadCredentialsException | UsernameNotFoundException e) {
            System.out.println(e.getMessage());
            sessionResponse.setCode(-1);
            sessionResponse.setMessage("Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(sessionResponse);
        }
        final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        final String jwtToken = jwtUtil.generateJwtToken(userDetails.getUsername(), userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()));
        final String refreshJwtToken =  jwtUtil.generateJwtRefreshToken(userDetails);
        log.info("User logged succesfully: "+request.getUsername());
        SessionResponse response = SessionResponse.builder()
                .code(1)
                .data(new JwtResponse(jwtToken, refreshJwtToken))
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("refresh")
    public ResponseEntity<Object> refreshToken (@RequestBody JwtTokenRefreshRequest request) {
        try {
            String refreshToken = request.getRefreshToken();
            String username = jwtUtil.getUsernameFromToken(refreshToken);
            Employee employee = employeeService.findByUsername(username);
            if (!jwtUtil.validateJwtToken(refreshToken, employee.getUsername())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    employee, null, employee.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwtToken = jwtUtil.generateJwtToken(employee.getUsername(), new ArrayList<>(employee.getRoles()));
            log.info("User: "+username+ " refreshed token successfully");
            return ResponseEntity.ok(new JwtResponse(jwtToken, refreshToken));
        } catch (ExpiredJwtException e) {
            log.info(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.badRequest().build();
        }

    }
}