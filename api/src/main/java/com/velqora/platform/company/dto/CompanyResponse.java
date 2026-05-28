package com.velqora.platform.company.dto;

import com.velqora.platform.common.enums.Status;
import com.velqora.platform.company.Company;

import java.time.LocalDateTime;
import java.util.UUID;

public record CompanyResponse(
        UUID id,
        String name,
        String legalName,
        String registrationNumber,
        String countryCode,
        String defaultCurrency,
        String timezone,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static CompanyResponse from(Company company) {
        return new CompanyResponse(
                company.getId(),
                company.getName(),
                company.getLegalName(),
                company.getRegistrationNumber(),
                company.getCountryCode(),
                company.getDefaultCurrency(),
                company.getTimezone(),
                company.getStatus(),
                company.getCreatedAt(),
                company.getUpdatedAt()
        );
    }
}