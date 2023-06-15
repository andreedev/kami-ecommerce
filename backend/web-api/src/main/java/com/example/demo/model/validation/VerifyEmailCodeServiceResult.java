package com.example.demo.model.validation;

import com.example.demo.model.EmailVerificationCode;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VerifyEmailCodeServiceResult {
    private EmailVerificationCode emailVerificationCode;
    private int code;
}
