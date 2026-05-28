package com.velqora.platform.branch.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CreateBranchRequest(
        @NotNull(message = "Company ID is required")
        UUID companyId,

        @NotBlank(message = "Branch name is required")
        String name,

        String code,
        String countryCode,
        String city,
        String address,
        String timezone
) {
}