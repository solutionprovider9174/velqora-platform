package com.velqora.platform.company.dto;

import com.velqora.platform.common.enums.Status;

public record UpdateCompanyRequest(
        String name,
        String legalName,
        String registrationNumber,
        String countryCode,
        String defaultCurrency,
        String timezone,
        Status status
) {
}