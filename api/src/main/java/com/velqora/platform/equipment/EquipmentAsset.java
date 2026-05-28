package com.velqora.platform.equipment;

import com.velqora.platform.branch.Branch;
import com.velqora.platform.common.entity.BaseEntity;
import com.velqora.platform.company.Company;
import com.velqora.platform.equipment.enums.EquipmentCondition;
import com.velqora.platform.equipment.enums.EquipmentStatus;
import com.velqora.platform.inventory.product.Product;
import com.velqora.platform.inventory.warehouse.Warehouse;
import com.velqora.platform.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "equipment_assets")
public class EquipmentAsset extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "asset_tag", nullable = false, length = 120)
    private String assetTag;

    @Column(name = "serial_number", length = 150)
    private String serialNumber;

    @Column(name = "equipment_type", length = 120)
    private String equipmentType;

    @Column(length = 150)
    private String manufacturer;

    @Column(name = "model_number", length = 150)
    private String modelNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private EquipmentStatus status = EquipmentStatus.IN_STOCK;

    @Enumerated(EnumType.STRING)
    @Column(name = "condition_status", nullable = false, length = 50)
    private EquipmentCondition conditionStatus = EquipmentCondition.GOOD;

    @Column(name = "install_location", columnDefinition = "TEXT")
    private String installLocation;

    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    @Column(name = "warranty_expiry_date")
    private LocalDate warrantyExpiryDate;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;
}