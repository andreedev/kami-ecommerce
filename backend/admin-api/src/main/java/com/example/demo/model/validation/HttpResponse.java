package com.example.demo.model.validation;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HttpResponse {
    private Integer code;
    private String message;
    private Object data;
}
