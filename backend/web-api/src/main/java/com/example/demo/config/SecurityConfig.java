package com.example.demo.config;

import com.example.demo.config.jwt.JwtAuthEntryPoint;
import com.example.demo.config.jwt.JwtAuthFilter;
import com.example.demo.utils.Enums;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;

@Configuration
@Slf4j
@EnableWebSecurity(debug = false)
@EnableMethodSecurity( prePostEnabled = false, securedEnabled = false, jsr250Enabled = true)
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthEntryPoint jwtAuthEntryPoint;
    private final JwtAuthFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.cors().configurationSource(request ->  {
            CorsConfiguration corsConfiguration = new CorsConfiguration();
            corsConfiguration.applyPermitDefaultValues();
            corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
            corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:8090","http://localhost:4200","http://localhost:4201", "http://kamistore.com.s3-website-us-east-1.amazonaws.com"));
//            corsConfiguration.setAllowedOrigins(Collections.singletonList("*"));
            return corsConfiguration;
        });
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.exceptionHandling().authenticationEntryPoint(jwtAuthEntryPoint);
        http.authorizeHttpRequests()
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/api/product/**").permitAll()
            .requestMatchers("/api/category/**").permitAll()
            .requestMatchers("/api/test/**").permitAll()
            .requestMatchers("/api/customer/**").hasAuthority(Enums.Roles.ROLE_CUSTOMER.getValue())
            .requestMatchers("/api/order/**").hasAuthority(Enums.Roles.ROLE_CUSTOMER.getValue())
            .requestMatchers("/api/sales/**").hasAuthority(Enums.Roles.ROLE_SALES.getValue())
            .requestMatchers("/api/admin/**").hasAnyAuthority(Enums.Roles.ROLE_ADMIN.getValue())
            .anyRequest().authenticated()
            .and()
                .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            ;
        return http.build();
    }


}
