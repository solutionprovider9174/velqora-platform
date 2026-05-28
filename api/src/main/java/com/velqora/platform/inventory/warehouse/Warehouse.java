package com.velqora.platform.inventory.warehouse;

import com.velqora.platform.branch.Branch;
import com.velqora.platform.common.entity.BaseEntity;
import com.velqora.platform.common.enums.Status;
import com.velqora.platform.company.Company;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "warehouses")
public class Warehouse extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 80)
    private String code;

    @Column(name = "country_code", length = 10)
    private String countryCode;

    @Column(length = 120)
    private String city;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Status status = Status.ACTIVE;
}