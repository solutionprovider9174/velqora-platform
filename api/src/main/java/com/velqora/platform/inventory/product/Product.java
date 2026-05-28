package com.velqora.platform.inventory.product;

import com.velqora.platform.common.entity.BaseEntity;
import com.velqora.platform.common.enums.Status;
import com.velqora.platform.company.Company;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "products")
public class Product extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false, length = 100)
    private String sku;

    @Column(nullable = false, length = 180)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 120)
    private String category;

    @Column(name = "unit_of_measure", nullable = false, length = 40)
    private String unitOfMeasure = "UNIT";

    @Column(name = "minimum_stock_level", nullable = false)
    private BigDecimal minimumStockLevel = BigDecimal.ZERO;

    @Column(name = "reorder_level", nullable = false)
    private BigDecimal reorderLevel = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Status status = Status.ACTIVE;
}