package com.example.demo.config.jwt;

import com.example.demo.model.Employee;
import com.example.demo.service.EmployeeService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Builder;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

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
            Employee employee = applicationContext.getBean("employeeService", EmployeeService.class).findByUsername(username);
            Employee safeCustomerObj = Employee.builder().username(employee.getUsername()).name(employee.getName()).email(employee.getEmail()).id(employee.getId()).roles(employee.getRoles()).status(employee.getStatus()).build();

            if (jwtUtil.validateJwtToken(token, safeCustomerObj.getUsername())) {
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(safeCustomerObj, null, safeCustomerObj.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request, response);
    }

}