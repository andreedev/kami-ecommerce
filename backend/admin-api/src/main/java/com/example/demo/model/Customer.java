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
import java.util.Collections;
import java.util.List;

@JsonIgnoreProperties({"authorities", "accountNonLocked", "accountNonExpired", "credentialsNonExpired", "enabled"})
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("customers")
public class Customer {
    @Id
    private String id;
    private String name;
    private String username;
    private String password;
    private String email;
    private Integer status;
    private Integer documentType;
    private String documentNumber;
    private String phoneNumber;
    private Collection<String> roles;
    private List<Address> addresses;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;
    private Cart cart;
    private Boolean isLinkedToGoogleAccount;

    public Customer(String name, String username, String password, String email, Integer documentType, String documentNumber, String phoneNumber) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.documentType = documentType;
        this.documentNumber = documentNumber;
        this.phoneNumber= phoneNumber;
        this.addresses=new ArrayList<>();
        this.roles = new ArrayList<>(Collections.singleton(Enums.Roles.ROLE_CUSTOMER.getValue()));
        this.status = Enums.CustomerStatus.REGISTERED.getCode();
    }

    public Collection<GrantedAuthority> getAuthorities(){
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        this.getRoles().forEach(role -> { authorities.add(new SimpleGrantedAuthority(role)); });
        return authorities;
    }
}
