package com.velqora.platform.branch.dto;

import com.velqora.platform.common.enums.Status;

public record UpdateBranchRequest(
        String name,
        String code,
        String countryCode,
        String city,
        String address,
        String timezone,
        Status status
) {
}