package com.velqora.platform.user.dto;

import com.velqora.platform.common.enums.Status;

import java.util.Set;
import java.util.UUID;

public record UpdateUserRequest(
        UUID companyId,
        UUID branchId,
        String firstName,
        String lastName,
        String password,
        String phone,
        Status status,
        Set<String> roles
) {
}