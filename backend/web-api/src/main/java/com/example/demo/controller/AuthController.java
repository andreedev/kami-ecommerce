package com.example.demo.controller;

import com.example.demo.config.CustomUserDetailsService;
import com.example.demo.config.jwt.JwtUtil;
import com.example.demo.config.jwt.model.JwtRequest;
import com.example.demo.config.jwt.model.JwtResponse;
import com.example.demo.config.jwt.model.JwtTokenRefreshRequest;
import com.example.demo.model.Customer;
import com.example.demo.model.VerificationCode;
import com.example.demo.model.googleapi.GoogleUser;
import com.example.demo.model.validation.*;
import com.example.demo.service.CustomerService;
import com.example.demo.service.EmailService;
import com.example.demo.service.GoogleApiClientService;
import com.example.demo.service.LocaleService;
import com.example.demo.utils.Enums;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController()
@RequestMapping("auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomerService customerService;
    private final EmailService emailService;
    private final GoogleApiClientService googleApiClientService;
    private final LocaleService localeService;
    @Autowired
    public AuthController(CustomUserDetailsService userDetailsService, AuthenticationManager authenticationManager, JwtUtil jwtUtil, CustomerService customerService, EmailService emailService, GoogleApiClientService googleApiClientService, LocaleService localeService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.customerService = customerService;
        this.emailService = emailService;
        this.googleApiClientService = googleApiClientService;
        this.localeService = localeService;
    }

    @PostMapping("checkEmail")
    public ResponseEntity<SessionResponse> checkEmail(@RequestBody Map<String, Object> req){
        String email = req.get("email").toString();
        SessionResponse sessionResponse = SessionResponse.builder().build();
        Customer customer = customerService.findByEmail(email);
        if (customer==null){
            sessionResponse.setCode(Enums.CheckEmailResponse.UNREGISTERED.getCode());
            return ResponseEntity.ok(sessionResponse);
        }
        if (customer.getStatus()==Enums.CustomerStatus.UNVERIFIED_EMAIL.getCode()){
            sessionResponse.setMessage(localeService.getMessage(Enums.CheckEmailResponse.UNVERIFIED_EMAIL.getValue()));
            sessionResponse.setCode(Enums.CheckEmailResponse.UNVERIFIED_EMAIL.getCode());
            return ResponseEntity.ok(sessionResponse);
        }
        if (customer.getStatus()==Enums.CustomerStatus.DISABLED.getCode()){
            sessionResponse.setCode((Enums.CheckEmailResponse.DISABLED_ACCOUNT.getCode()));
            sessionResponse.setMessage(localeService.getMessage(Enums.CheckEmailResponse.DISABLED_ACCOUNT.getValue()));
            return ResponseEntity.ok(sessionResponse);
        }
        if (customer.getIsLinkedToGoogleAccount()){
            sessionResponse.setCode(Enums.CheckEmailResponse.ACCOUNT_LINKED_TO_GOOGLE.getCode());
            sessionResponse.setMessage(localeService.getMessage((Enums.CheckEmailResponse.ACCOUNT_LINKED_TO_GOOGLE.getValue())));
            return ResponseEntity.ok(sessionResponse);
        }
        sessionResponse.setCode(Enums.CheckEmailResponse.EMAIL_VERIFIED.getCode());
        return ResponseEntity.ok(sessionResponse);
    }
    @PostMapping("login")
    public ResponseEntity<SessionResponse> createToken(@RequestBody @Valid JwtRequest request) {
        Authentication authentication;
        SessionResponse sessionResponse = SessionResponse.builder().build();
        try {
            authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (BadCredentialsException | UsernameNotFoundException e) {
            System.out.println(e.getMessage());
            sessionResponse.setCode(Enums.SessionResponseCode.INVALID_PASSWORD.getCode());
            sessionResponse.setMessage(localeService.getMessage((Enums.SessionResponseCode.INVALID_PASSWORD.getValue())));
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(sessionResponse);
        }
        Customer customer = (Customer) authentication.getPrincipal();
        if (customer.getStatus()==Enums.CustomerStatus.UNVERIFIED_EMAIL.getCode()){
            sessionResponse.setCode(Enums.SessionResponseCode.UNVERIFIED_EMAIL.getCode());
            sessionResponse.setMessage(localeService.getMessage(Enums.SessionResponseCode.UNVERIFIED_EMAIL.getValue()));
            return ResponseEntity.ok(sessionResponse);
        }
        if (customer.getStatus()==Enums.CustomerStatus.DISABLED.getCode()){
            sessionResponse.setCode(Enums.SessionResponseCode.DISABLED_ACCOUNT.getCode());
            sessionResponse.setMessage(localeService.getMessage(Enums.SessionResponseCode.DISABLED_ACCOUNT.getValue()));
            return ResponseEntity.ok(sessionResponse);
        }
        if (customer.getIsLinkedToGoogleAccount()){
            sessionResponse.setCode(Enums.SessionResponseCode.ACCOUNT_LINKED_TO_GOOGLE.getCode());
            sessionResponse.setMessage(localeService.getMessage((Enums.SessionResponseCode.ACCOUNT_LINKED_TO_GOOGLE.getValue())));
            return ResponseEntity.ok(sessionResponse);
        }

        log.info("User logged succesfully: "+request.getUsername());
        SessionResponse response = SessionResponse.builder()
                .code(Enums.SessionResponseCode.SUCCESSFUL_LOGIN.getCode())
                .data(authenticateCustomer(customer.getEmail(), customer.getRoles()))
                .message(localeService.getMessage(Enums.SessionResponseCode.SUCCESSFUL_LOGIN.getValue()))
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("refresh")
    public ResponseEntity<Object> refreshToken (@RequestBody JwtTokenRefreshRequest request) {
        try {
            String refreshToken = request.getRefreshToken();
            String username = jwtUtil.getUsernameFromToken(refreshToken);
            Customer customer = customerService.findByEmail(username);
            if (customer==null)
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            if (!jwtUtil.validateJwtToken(refreshToken, customer.getEmail())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    customer, null, customer.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authToken);

            String jwtToken = jwtUtil.generateJwtToken(customer.getEmail(), new ArrayList<>(customer.getRoles()));
            log.info("User: "+username+ " refreshed token successfully");
            return ResponseEntity.ok(new JwtResponse(jwtToken, refreshToken));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("register")
    public Integer registerCustomer(@RequestBody @Valid CustomerSignUpWithEmailRequest request){
        Customer customer = customerService.registerCustomer(request.buildCustomer());
        String code = customerService.generateVerificationCode(
                new VerificationCode(customer.getId(), Enums.VerificationCodeType.EMAIL_VERIFICATION.getCode()));
        sendVerificationEmail(customer.getEmail(), code);
        return 1;
    }

    @PostMapping("resendVerificationEmail")
    public int resendVerificationEmail(@RequestBody @Valid ResendEmailVerificationRequest request){
        Customer customer = customerService.findByEmail(request.getEmail(), Enums.CustomerStatus.UNVERIFIED_EMAIL.getCode());
        if (customer==null) return -1;
        //you can implement time validation using createdAt from VerificationCode collection to protect from spam
        String code = customerService.generateVerificationCode(
                new VerificationCode(customer.getId(), Enums.VerificationCodeType.EMAIL_VERIFICATION.getCode()));
        sendVerificationEmail(customer.getEmail(), code);
        return 1;
    }

    @PostMapping("verifyEmailCode")
    public SessionResponse verifyEmailCode(@RequestBody Map<String, Object> req){
        String code = req.get("code").toString();
        VerifyEmailCodeServiceResult result = customerService.verifyEmailCode(code);
        if (result.getCode()==1) {
            Customer customer = customerService.findById(result.getVerificationCode().getCustomerId());
            JwtResponse jwtResponse = authenticateCustomer(customer.getEmail(), (List<String>) customer.getRoles());
            return SessionResponse.builder().code(result.getCode()).data(jwtResponse).build();
        }
        return SessionResponse.builder().code(result.getCode()).build();
    }

    @PostMapping("resetPassword")
    public ResponseEntity<Boolean> resetPassword(@RequestBody Map<String, Object> req){
        log.info("resetPassword");
        String email = req.get("email").toString();
        Customer customer = customerService.findByEmail(email, Enums.CustomerStatus.VERIFIED_EMAIL.getCode());
        if (customer==null) return ResponseEntity.ok(false);
        String code = customerService.generateVerificationCode(
                new VerificationCode(customer.getId(), Enums.VerificationCodeType.PASSWORD_RESET.getCode()));
        emailService.sendEmail(email,
                localeService.getMessage("reset_password_email_subject"),
                localeService.getMessage("reset_password_email_subject"),
                localeService.getMessage("reset_password_email_message_part_1") + code +
                        localeService.getMessage("reset_password_email_message_part_2")
        );
        return ResponseEntity.ok(true);
    }

    @PostMapping("verifyResetPassword")
    public ResponseEntity<Boolean> verifyResetPassword(@RequestBody @Valid VerifyResetPasswordRequest req){
        log.info("verifyResetPassword");
        boolean result = customerService.verifyResetPassword(req);
        return ResponseEntity.ok(result);
    }

    @PostMapping("authenticateWithGoogle")
    public SessionResponse authenticateWithGoogle(@RequestBody @Valid ResolveGoogleAuthRequest req) {
        log.info("authenticateWithGoogle");
        SessionResponse sessionResponse = SessionResponse.builder().build();
        Customer customer = customerService.findByEmail(req.getEmail(), Enums.CustomerStatus.VERIFIED_EMAIL.getCode());
        if (customer==null){
            sessionResponse.setCode(Enums.AuthenticateWithGoogleResponseCode.UNREGISTERED.getCode());
            return sessionResponse;
        }
        if (!customer.getIsLinkedToGoogleAccount()){
            sessionResponse.setCode(Enums.AuthenticateWithGoogleResponseCode.ACCOUNT_NOT_LINKED_TO_GOOGLE.getCode());
            return sessionResponse;
        }
        GoogleUser googleUser = googleApiClientService.validateGoogleIdToken(req.getGoogleIdToken());
        if (googleUser == null){
            sessionResponse.setCode(Enums.ValidateGoogleIdTokenResponseCode.INVALID_GOOGLE_ID_TOKEN.getCode());
            return sessionResponse;
        }
        if (!googleUser.getEmail().equalsIgnoreCase(req.getEmail())){
            sessionResponse.setCode(Enums.ValidateGoogleIdTokenResponseCode.EMAIL_RECEIVED_AND_GOOGLE_EMAIL_DOES_NOT_MATCH.getCode());
            return sessionResponse;
        }
        JwtResponse jwtResponse = authenticateCustomer(customer.getEmail(), customer.getRoles());
        sessionResponse.setCode(Enums.AuthenticateWithGoogleResponseCode.SUCCESS.getCode());
        sessionResponse.setData(jwtResponse);
        return sessionResponse;
    }

    @PostMapping("linkToGoogleAccount")
    public ResponseEntity<SessionResponse> linkToGoogleAccount(@RequestBody @Valid JwtRequest request){
        log.info("linkToGoogleAccount");
        Authentication authentication;
        SessionResponse sessionResponse = SessionResponse.builder().build();
        try {
            authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (BadCredentialsException | UsernameNotFoundException e) {
            System.out.println(e.getMessage());
            sessionResponse.setCode(Enums.LinkToGoogleAccountResponseCode.INVALID_PASSWORD.getCode());
            sessionResponse.setMessage(localeService.getMessage((Enums.LinkToGoogleAccountResponseCode.INVALID_PASSWORD.getValue())));
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(sessionResponse);
        }
        Customer customer = (Customer) authentication.getPrincipal();
        GoogleUser googleUser = googleApiClientService.validateGoogleIdToken(request.getGoogleIdToken());
        if (googleUser == null){
            sessionResponse.setCode(Enums.ValidateGoogleIdTokenResponseCode.INVALID_GOOGLE_ID_TOKEN.getCode());
            return ResponseEntity.ok(sessionResponse);
        }
        if (!googleUser.getEmail().equalsIgnoreCase(customer.getEmail())){
            sessionResponse.setCode(Enums.ValidateGoogleIdTokenResponseCode.EMAIL_RECEIVED_AND_GOOGLE_EMAIL_DOES_NOT_MATCH.getCode());
            return ResponseEntity.ok(sessionResponse);
        }
        boolean result = customerService.linkToGoogleAccount(Customer.builder().email(customer.getEmail()).build());
        if (!result){
            sessionResponse.setCode(Enums.LinkToGoogleAccountResponseCode.INTERNAL_ERROR.getCode());
            return ResponseEntity.ok(sessionResponse);
        }
        JwtResponse jwtResponse = authenticateCustomer(customer.getEmail(),customer.getRoles());
        sessionResponse.setCode(Enums.LinkToGoogleAccountResponseCode.SUCCESSFUL_LINKAGE.getCode());
        sessionResponse.setMessage(localeService.getMessage((Enums.LinkToGoogleAccountResponseCode.SUCCESSFUL_LINKAGE.getValue())));
        sessionResponse.setData(jwtResponse);
        return ResponseEntity.ok(sessionResponse);
    }

    @PostMapping("signUpWithGoogle")
    public SessionResponse signUpWithGoogle(@RequestBody @Valid CustomerSignUpWithGoogleRequestExt request) {
        log.info("signUpWithGoogle");
        GoogleUser googleUser = googleApiClientService.validateGoogleIdToken(request.getGoogleIdToken());
        if (googleUser == null)
            return SessionResponse.builder().code(Enums.ValidateGoogleIdTokenResponseCode.INVALID_GOOGLE_ID_TOKEN.getCode()).build();
        if (!googleUser.getEmail().equals(request.getEmail()))
            return SessionResponse.builder().code(Enums.ValidateGoogleIdTokenResponseCode.EMAIL_RECEIVED_AND_GOOGLE_EMAIL_DOES_NOT_MATCH.getCode()).build();
        Customer customer = customerService.registerCustomer(request.buildCustomer());
        JwtResponse jwtResponse = authenticateCustomer(customer.getEmail(), customer.getRoles());
        return SessionResponse.builder().data(jwtResponse).code(1).build();
    }

    private void sendVerificationEmail(String email, String code){
        emailService.sendEmail(email,
                localeService.getMessage("sign_up_email_subject"),
                localeService.getMessage("sign_up_email_subject"),
                localeService.getMessage("sign_up_email_message_part_1") + code +
                        localeService.getMessage("sign_up_email_message_part_2")
        );
    }
    private JwtResponse authenticateCustomer(String username, List<String> roles){
        final String jwtToken = jwtUtil.generateJwtToken(username, roles);
        final String refreshJwtToken =  jwtUtil.generateJwtRefreshToken(username);
        log.info("User authenticated by method authenticateCustomer: "+username);
        return new JwtResponse(jwtToken, refreshJwtToken);
    }
}