package com.example.demo.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("verificationCodes")
public class VerificationCode {
    @Id
    private String id;
    private String customerId;
    private String code;
    private Integer type;
    @CreatedDate
    private LocalDateTime createdAt;

    public VerificationCode(String customerId, Integer type) {
        this.customerId = customerId;
        this.type = type;
    }
}

//db.emailVerificationCodes.createIndex( { "createdAt": 1 }, { expireAfterSeconds: 610 })
//db.verificationCodes.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 610 })
//db.verificationCodes.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 300 })
