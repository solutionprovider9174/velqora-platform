package com.velqora.platform.equipment.dto;

import com.velqora.platform.equipment.EquipmentAsset;
import com.velqora.platform.equipment.enums.EquipmentCondition;
import com.velqora.platform.equipment.enums.EquipmentStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record EquipmentAssetResponse(
        UUID id,
        UUID companyId,
        String companyName,
        UUID branchId,
        String branchName,
        UUID warehouseId,
        String warehouseName,
        UUID productId,
        String sku,
        String productName,
        String assetTag,
        String serialNumber,
        String equipmentType,
        String manufacturer,
        String modelNumber,
        EquipmentStatus status,
        EquipmentCondition conditionStatus,
        String installLocation,
        LocalDate purchaseDate,
        LocalDate warrantyExpiryDate,
        String notes,
        UUID createdBy,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static EquipmentAssetResponse from(EquipmentAsset asset) {
        return new EquipmentAssetResponse(
                asset.getId(),
                asset.getCompany().getId(),
                asset.getCompany().getName(),
                asset.getBranch() != null ? asset.getBranch().getId() : null,
                asset.getBranch() != null ? asset.getBranch().getName() : null,
                asset.getWarehouse() != null ? asset.getWarehouse().getId() : null,
                asset.getWarehouse() != null ? asset.getWarehouse().getName() : null,
                asset.getProduct() != null ? asset.getProduct().getId() : null,
                asset.getProduct() != null ? asset.getProduct().getSku() : null,
                asset.getProduct() != null ? asset.getProduct().getName() : null,
                asset.getAssetTag(),
                asset.getSerialNumber(),
                asset.getEquipmentType(),
                asset.getManufacturer(),
                asset.getModelNumber(),
                asset.getStatus(),
                asset.getConditionStatus(),
                asset.getInstallLocation(),
                asset.getPurchaseDate(),
                asset.getWarrantyExpiryDate(),
                asset.getNotes(),
                asset.getCreatedBy() != null ? asset.getCreatedBy().getId() : null,
                asset.getCreatedAt(),
                asset.getUpdatedAt()
        );
    }
}