package com.velqora.platform.company.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateCompanyRequest(
        @NotBlank(message = "Company name is required")
        String name,

        String legalName,
        String registrationNumber,
        String countryCode,
        String defaultCurrency,
        String timezone
) {
}