package com.velqora.platform.company;

import com.velqora.platform.common.entity.BaseEntity;
import com.velqora.platform.common.enums.Status;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "companies")
public class Company extends BaseEntity {

    @Column(nullable = false, length = 150)
    private String name;

    @Column(name = "legal_name", length = 200)
    private String legalName;

    @Column(name = "registration_number", length = 100)
    private String registrationNumber;

    @Column(name = "country_code", length = 10)
    private String countryCode;

    @Column(name = "default_currency", length = 10)
    private String defaultCurrency;

    @Column(length = 80)
    private String timezone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Status status = Status.ACTIVE;
}