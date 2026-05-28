package com.velqora.platform.branch.dto;

import com.velqora.platform.branch.Branch;
import com.velqora.platform.common.enums.Status;

import java.time.LocalDateTime;
import java.util.UUID;

public record BranchResponse(
        UUID id,
        UUID companyId,
        String companyName,
        String name,
        String code,
        String countryCode,
        String city,
        String address,
        String timezone,
        Status status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static BranchResponse from(Branch branch) {
        return new BranchResponse(
                branch.getId(),
                branch.getCompany().getId(),
                branch.getCompany().getName(),
                branch.getName(),
                branch.getCode(),
                branch.getCountryCode(),
                branch.getCity(),
                branch.getAddress(),
                branch.getTimezone(),
                branch.getStatus(),
                branch.getCreatedAt(),
                branch.getUpdatedAt()
        );
    }
}