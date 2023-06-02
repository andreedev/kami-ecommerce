package com.example.demo.model.validation;

import com.example.demo.model.Discount;
import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter @Setter
public class DiscountSaveRequest {
    @NotNull(message = "Percentage is required")
    @Min(value = 0, message = "Percentage must be greater than or equal to zero")
    @Max(value = 100, message = "Percentage must be less than or equal to 100")
    private Integer percentage;

    @NotNull(message = "Start date is required")
    private String startDate;

    @NotNull(message = "End date is required")
    private String endDate;

    public Discount toDiscount() {
//        ZoneId desiredZone = ZoneId.of("America/Bogota");
//        ZonedDateTime startDateColombia = startDate.atZone(ZoneOffset.UTC).withZoneSameInstant(desiredZone);
//        ZonedDateTime endDateColombia = endDate.atZone(ZoneOffset.UTC).withZoneSameInstant(desiredZone);
//        return new Discount(percentage, startDateColombia.toLocalDateTime(), endDateColombia.toLocalDateTime());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startDateTime = LocalDateTime.parse(startDate, formatter);
        LocalDateTime endDateTime = LocalDateTime.parse(startDate, formatter);
        return new Discount(percentage, startDateTime, endDateTime);
    }
}
