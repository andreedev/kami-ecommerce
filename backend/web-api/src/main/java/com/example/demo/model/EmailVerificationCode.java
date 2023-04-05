package com.example.demo.model;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("emailVerificationCodes")
public class EmailVerificationCode {
    @Id
    private String id;
    private String customerId;
    private String code;
    @CreatedDate
    private LocalDateTime createdAt;
}

//db.emailVerificationCodes.createIndex( { "createdAt": 1 }, { expireAfterSeconds: 630 })