package com.example.demo.model.validation;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VerifyResetPasswordRequest {
    @NotNull
    private String code;
    @NotEmpty(message = "The password is required")
    @Size(min = 8, max = 20, message = "The password must be between {min} and {max} characters")
    private String newPassword;
//    private String newPasswordConfirm;
}
