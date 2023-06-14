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

    private final JwtUserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomerService customerService;
    private final EmailService emailService;

    @Autowired
    public AuthController(JwtUserDetailsService userDetailsService, AuthenticationManager authenticationManager, JwtUtil jwtUtil, CustomerService customerService, EmailService emailService) {
        this.userDetailsService = userDetailsService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.customerService = customerService;
        this.emailService = emailService;
    }

    @PostMapping("login")
    public ResponseEntity<Object> createToken(@RequestBody JwtRequest request) throws Exception {
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
            Customer customer = customerService.findByUsername(username);
            if (!jwtUtil.validateJwtToken(refreshToken, customer.getUsername())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    customer, null, customer.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwtToken = jwtUtil.generateJwtToken(customer.getUsername(), new ArrayList<>(customer.getRoles()));
            log.info("User: "+username+ " refreshed token successfully");
            return ResponseEntity.ok(new JwtResponse(jwtToken, refreshToken));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("register")
    public Integer registerCustomer(@RequestBody @Valid CustomerRegistrationRequest req){
        Boolean exists = customerService.customerExistsByUsernameOrEmailOrDocumentNumber(req);//dividir esto
        if (exists) return -1;
        Customer customer = customerService.registerCustomer(req.toCustomer());
        String code = customerService.generateEmailVerificationCode(customer.getId());
        emailService.sendEmail(req.getEmail(), "Welcome", "Welcome to Kami Ecommerce", "<p>Verification code: "+code+"</p>"+
                "<p>Code is valid just for 10 minutes.</p>");
        return 1;
    }

    @PostMapping("verifyEmail")
    public ResponseEntity<Integer> verifyEmail(@RequestBody Map<String, Object> req){
        String code = req.get("emailVerificationCode").toString();
        return ResponseEntity.ok(customerService.verifyEmail(code));
    }
}