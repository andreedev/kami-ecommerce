package com.example.demo.model;

import com.example.demo.utils.Enums;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

@JsonIgnoreProperties({"authorities"})
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("employees")
public class Employee {
    @Id
    private String id;
    private String name;
    private String username;
    private String password;
    private String email;
    private String status;
    private Collection<String> roles;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    public Employee(String name, String username, String password, String email, Collection<String> roles) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = roles;
        this.status = Enums.EmployeeStatus.ENABLED.getValue();
    }

    public Collection<GrantedAuthority> getAuthorities(){
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        this.getRoles().forEach(role -> { authorities.add(new SimpleGrantedAuthority(role)); });
        return authorities;
    }
}
