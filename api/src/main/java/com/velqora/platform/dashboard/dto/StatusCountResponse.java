package com.velqora.platform.dashboard.dto;

public record StatusCountResponse(
        String status,
        long count
) {
}