package com.example.demo.model.validation;

import com.example.demo.config.jwt.model.JwtResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SessionResponse {
    private Integer code;
    private JwtResponse data;
}
