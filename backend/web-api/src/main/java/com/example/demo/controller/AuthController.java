package com.example.demo.controller;

import com.example.demo.config.jwt.JwtUserDetailsService;
import com.example.demo.config.jwt.JwtUtil;
import com.example.demo.config.jwt.model.JwtRequest;
import com.example.demo.config.jwt.model.JwtResponse;
import com.example.demo.config.jwt.model.JwtTokenRefreshRequest;
import com.example.demo.model.Customer;
import com.example.demo.model.validation.CustomerRegistrationRequest;
import com.example.demo.service.CustomerService;
import com.example.demo.service.EmailService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestController()
@RequestMapping("auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomerService customerService;
    private final EmailService emailService;

    @Autowired
    public AuthController(JwtUserDetailsService userDetailsService, AuthenticationManager authenticationManager, JwtUtil jwtUtil, CustomerService customerService, EmailService emailService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.customerService = customerService;
        this.emailService = emailService;
    }

    @PostMapping("login")
    public ResponseEntity<Object> createToken(@RequestBody @Valid JwtRequest request) throws Exception {
        try {
            UsernamePasswordAuthenticationToken authentication = (UsernamePasswordAuthenticationToken) authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            final String jwtToken = jwtUtil.generateJwtToken(userDetails.getUsername(), userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()));
            final String refreshJwtToken =  jwtUtil.generateJwtRefreshToken(userDetails);
            log.info("User logged succesfully: "+request.getUsername());
            return ResponseEntity.ok(new JwtResponse(jwtToken, refreshJwtToken));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("refresh")
    public ResponseEntity<Object> refreshToken (@RequestBody JwtTokenRefreshRequest request) {
        try {
            String refreshToken = request.getRefreshToken();
            String username = jwtUtil.getUsernameFromToken(refreshToken);
            Customer customer = customerService.findByEmail(username);
            if (customer==null){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            if (!jwtUtil.validateJwtToken(refreshToken, customer.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    customer, null, customer.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwtToken = jwtUtil.generateJwtToken(customer.getEmail(), new ArrayList<>(customer.getRoles()));
            log.info("User: "+username+ " refreshed token successfully");
            return ResponseEntity.ok(new JwtResponse(jwtToken, refreshToken));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("register")
    public Integer registerCustomer(@RequestBody @Valid CustomerRegistrationRequest req){
        boolean existsByDocumentNumber = customerService.existsByDocumentNumber(req.getDocumentNumber());
        if (existsByDocumentNumber) return -2;
        Customer customer = customerService.registerCustomer(req.toCustomer());
        String code = customerService.generateEmailVerificationCode(customer.getId());
        emailService.sendEmail(req.getEmail(), "Bienvenido", "Bienvenido a Company Name", "<p>Código de verificación: "+code+"</p>"+
                "<p>Este código es válido solo por 10 minutos.</p>");
        return 1;
    }

    @PostMapping("verifyEmailCode")
    public ResponseEntity<Integer> verifyEmailCode(@RequestBody Map<String, Object> req){
        String code = req.get("emailVerificationCode").toString();
        return ResponseEntity.ok(customerService.verifyEmailCode(code));
    }

    @PostMapping("checkEmail")
    public ResponseEntity<Integer> checkEmail(@RequestBody Map<String, Object> req){
        String code = req.get("email").toString();
        return ResponseEntity.ok(customerService.checkEmail(code));
    }
}