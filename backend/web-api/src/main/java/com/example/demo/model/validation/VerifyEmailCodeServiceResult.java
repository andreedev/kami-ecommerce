package com.example.demo.model.validation;

import com.example.demo.model.VerificationCode;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VerifyEmailCodeServiceResult {
    private VerificationCode verificationCode;
    private int code;
}
