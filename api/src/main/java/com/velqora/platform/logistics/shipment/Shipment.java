package com.velqora.platform.logistics.shipment;

import com.velqora.platform.branch.Branch;
import com.velqora.platform.common.entity.BaseEntity;
import com.velqora.platform.company.Company;
import com.velqora.platform.logistics.enums.ShipmentPriority;
import com.velqora.platform.logistics.enums.ShipmentStatus;
import com.velqora.platform.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "shipments")
public class Shipment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @Column(name = "shipment_number", nullable = false, unique = true, length = 80)
    private String shipmentNumber;

    @Column(name = "customer_name", length = 180)
    private String customerName;

    @Column(name = "customer_reference", length = 120)
    private String customerReference;

    @Column(name = "origin_address", columnDefinition = "TEXT")
    private String originAddress;

    @Column(name = "destination_address", columnDefinition = "TEXT")
    private String destinationAddress;

    @Column(name = "destination_city", length = 120)
    private String destinationCity;

    @Column(name = "destination_country_code", length = 10)
    private String destinationCountryCode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private ShipmentStatus status = ShipmentStatus.CREATED;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private ShipmentPriority priority = ShipmentPriority.NORMAL;

    @Column(name = "carrier_name", length = 150)
    private String carrierName;

    @Column(name = "tracking_reference", length = 150)
    private String trackingReference;

    @Column(name = "planned_dispatch_date")
    private LocalDateTime plannedDispatchDate;

    @Column(name = "planned_delivery_date")
    private LocalDateTime plannedDeliveryDate;

    @Column(name = "actual_delivery_date")
    private LocalDateTime actualDeliveryDate;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;
}