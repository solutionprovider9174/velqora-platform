package com.velqora.platform.security.role.dto;

import com.velqora.platform.security.role.Role;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public record RoleResponse(
        UUID id,
        String name,
        String description,
        boolean systemRole,
        Set<String> permissions
) {

    public static RoleResponse from(Role role) {
        return new RoleResponse(
                role.getId(),
                role.getName(),
                role.getDescription(),
                role.isSystemRole(),
                role.getPermissions()
                        .stream()
                        .map(permission -> permission.getCode())
                        .collect(Collectors.toSet())
        );
    }
}