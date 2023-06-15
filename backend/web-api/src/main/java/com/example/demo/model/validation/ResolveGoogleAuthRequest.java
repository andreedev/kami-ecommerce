package com.example.demo.model.validation;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResolveGoogleAuthRequest {
    @NotNull
    private String email;
    @NotNull
    private String googleIdToken;
}
