package com.example.demo.controller;

import com.example.demo.config.jwt.JwtUserDetailsService;
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
import com.example.demo.utils.Enums;
import com.example.demo.utils.Utils;
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
import java.util.List;
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
    private final GoogleApiClientService googleApiClientService;

    @Autowired
    public AuthController(JwtUserDetailsService userDetailsService, AuthenticationManager authenticationManager, JwtUtil jwtUtil, CustomerService customerService, EmailService emailService, GoogleApiClientService googleApiClientService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.customerService = customerService;
        this.emailService = emailService;
        this.googleApiClientService = googleApiClientService;
    }
    @PostMapping("login")
    public ResponseEntity<Object> createToken(@RequestBody @Valid JwtRequest request) {
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
    public Integer registerCustomer(@RequestBody @Valid CustomerSignUpRequest req){
        Customer customerWithStatusRegistered = customerService.findByEmail(req.getEmail());
        if (customerWithStatusRegistered!=null && customerWithStatusRegistered.getStatus().equals(Enums.CustomerStatus.REGISTERED.getCode())){
            customerService.deleteById(customerWithStatusRegistered.getId());
        }

        Customer customer = customerService.registerCustomer(req.toCustomer());
        String code = customerService.generateVerificationCode(
                new VerificationCode(customer.getId(), Enums.VerificationCodeType.EMAIL_VERIFICATION.getCode()));
        emailService.sendEmail(customer.getEmail(), "Verificar correo electrónico", "Verificar correo electrónico",
                "¡Hola!\n\nRecibes este correo porque te has registrado en nuestro sitio web. Para completar el proceso de registro, necesitamos verificar tu dirección de correo electrónico. A continuación, encontrarás un código de verificación de 6 dígitos que deberás utilizar para confirmar tu correo electrónico.\n\nCódigo de verificación: " + code + "\n\nSi no has realizado este registro, por favor ignora este mensaje.\n\n¡Gracias por unirte a nosotros!\n\nEl equipo de soporte de Company Name"
        );
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

    @PostMapping("checkEmail")
    public ResponseEntity<Boolean> checkEmail(@RequestBody Map<String, Object> req){
        String email = req.get("email").toString();
        return ResponseEntity.ok(customerService.existsByEmail(email));
    }

    @PostMapping("resetPassword")
    public ResponseEntity<Boolean> resetPassword(@RequestBody Map<String, Object> req){
        log.info("resetPassword");
        String email = req.get("email").toString();
        Customer customer = customerService.findByEmail(email, Enums.CustomerStatus.EMAIL_VERIFIED.getCode());
        if (customer==null) return ResponseEntity.ok(false);
        String code = customerService.generateVerificationCode(
                new VerificationCode(customer.getId(), Enums.VerificationCodeType.PASSWORD_RESET.getCode()));
        emailService.sendEmail(email, "Reestablecer contraseña", "Reestablecer contraseña",
                "¡Hola!\n\nRecibes este correo porque has solicitado restablecer tu contraseña. A continuación, encontrarás un código de 6 dígitos que podrás utilizar para completar el proceso.\n\nCódigo de verificación: " + code + "\n\nSi no has solicitado este cambio, puedes ignorar este mensaje. Tu contraseña actual seguirá siendo válida.\n\n¡Que tengas un buen día!\n\nEl equipo de soporte"
        );
        return ResponseEntity.ok(true);
    }



    @PostMapping("resolveGoogleAuth")
    public SessionResponse resolveGoogleAuth(@RequestBody @Valid ResolveGoogleAuthRequest req) {
        log.info("resolveGoogleAuth");
        Customer customer = customerService.findByEmail(req.getEmail(), Enums.CustomerStatus.EMAIL_VERIFIED.getCode());
        if (customer==null)
            return SessionResponse.builder().code(Enums.GoogleAuthResolverCode.UNREGISTERED.getCode()).build();
        if (!customer.getIsLinkedToGoogleAccount())
            return SessionResponse.builder().code(Enums.GoogleAuthResolverCode.ACCOUNT_NOT_LINKED_TO_GOOGLE.getCode()).build();
        GoogleUser googleUser = googleApiClientService.validateGoogleIdToken(req.getGoogleIdToken());
        if (googleUser == null)
            return SessionResponse.builder().code(Enums.GoogleApiClientCode.INVALID_GOOGLE_ID_TOKEN.getCode()).build();
        if (!googleUser.getEmail().equals(req.getEmail()))
            return SessionResponse.builder().code(Enums.GoogleApiClientCode.EMAIL_RECEIVED_AND_GOOGLE_EMAIL_DOES_NOT_MATCH.getCode()).build();

        JwtResponse jwtResponse = authenticateCustomer(customer.getEmail(), (List<String>) customer.getRoles());
        return SessionResponse.builder()
                .data(jwtResponse)
                .code(Enums.GoogleAuthResolverCode.SUCCESSFUL_GOOGLE_LOGIN.getCode()).build();
    }

    @PostMapping("linkToGoogleAccount")
    public SessionResponse linkToGoogleAccount(@RequestBody @Valid JwtRequest request){
        log.info("linkToGoogleAccount");
        UsernamePasswordAuthenticationToken authentication = (UsernamePasswordAuthenticationToken) authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        final UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        GoogleUser googleUser = googleApiClientService.validateGoogleIdToken(request.getGoogleIdToken());
        if (googleUser == null)
            return SessionResponse.builder().code(Enums.GoogleApiClientCode.INVALID_GOOGLE_ID_TOKEN.getCode()).build();
        if (!googleUser.getEmail().equals(userDetails.getUsername()))
            return SessionResponse.builder().code(Enums.GoogleApiClientCode.EMAIL_RECEIVED_AND_GOOGLE_EMAIL_DOES_NOT_MATCH.getCode()).build();

        boolean result = customerService.linkToGoogleAccount(Customer.builder().email(userDetails.getUsername()).build());
        if (!result) return SessionResponse.builder().code(-1).build();
        JwtResponse jwtResponse = authenticateCustomer(userDetails.getUsername(), Utils.parseToStringList(userDetails.getAuthorities()) );
        return SessionResponse.builder().data(jwtResponse).code(1).build();
    }

    @PostMapping("signUpWithGoogle")
    public SessionResponse signUpWithGoogle(@RequestBody @Valid CustomerSignUpWithGoogleRequest request) {
        log.info("registerWithGoogle");
        GoogleUser googleUser = googleApiClientService.validateGoogleIdToken(request.getGoogleIdToken());
        if (googleUser == null)
            return SessionResponse.builder().code(Enums.GoogleApiClientCode.INVALID_GOOGLE_ID_TOKEN.getCode()).build();
        if (!googleUser.getEmail().equals(request.getEmail()))
            return SessionResponse.builder().code(Enums.GoogleApiClientCode.EMAIL_RECEIVED_AND_GOOGLE_EMAIL_DOES_NOT_MATCH.getCode()).build();
        Customer customerToSave = request.toCustomer();
        customerToSave.setIsLinkedToGoogleAccount(true);
        customerToSave.setStatus(Enums.CustomerStatus.EMAIL_VERIFIED.getCode());
        Customer customer = customerService.registerCustomer(customerToSave);
        JwtResponse jwtResponse = authenticateCustomer(customer.getEmail(), (List<String>) customer.getRoles());
        return SessionResponse.builder().data(jwtResponse).code(1).build();
    }



    @PostMapping("verifyResetPassword")
    public ResponseEntity<Boolean> verifyResetPassword(@RequestBody @Valid VerifyResetPasswordRequest req){
        log.info("verifyResetPassword");
        boolean result = customerService.verifyResetPassword(req);
        return ResponseEntity.ok(result);
    }


    private JwtResponse authenticateCustomer(String username, List<String> roles){
        final String jwtToken = jwtUtil.generateJwtToken(username, roles);
        final String refreshJwtToken =  jwtUtil.generateJwtRefreshToken(username);
        log.info("User authenticated by method authenticateCustomer: "+username);
        return new JwtResponse(jwtToken, refreshJwtToken);
    }
}