package com.velqora.platform.company;

import com.velqora.platform.common.enums.Status;
import com.velqora.platform.common.exception.ResourceNotFoundException;
import com.velqora.platform.company.dto.CompanyResponse;
import com.velqora.platform.company.dto.CreateCompanyRequest;
import com.velqora.platform.company.dto.UpdateCompanyRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Transactional
    public CompanyResponse create(CreateCompanyRequest request) {
        Company company = new Company();
        company.setName(request.name());
        company.setLegalName(request.legalName());
        company.setRegistrationNumber(request.registrationNumber());
        company.setCountryCode(request.countryCode());
        company.setDefaultCurrency(request.defaultCurrency());
        company.setTimezone(request.timezone());
        company.setStatus(Status.ACTIVE);

        return CompanyResponse.from(companyRepository.save(company));
    }

    @Transactional(readOnly = true)
    public List<CompanyResponse> findAll() {
        return companyRepository.findAll()
                .stream()
                .map(CompanyResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public CompanyResponse findById(UUID id) {
        Company company = getCompany(id);
        return CompanyResponse.from(company);
    }

    @Transactional
    public CompanyResponse update(UUID id, UpdateCompanyRequest request) {
        Company company = getCompany(id);

        if (request.name() != null) company.setName(request.name());
        if (request.legalName() != null) company.setLegalName(request.legalName());
        if (request.registrationNumber() != null) company.setRegistrationNumber(request.registrationNumber());
        if (request.countryCode() != null) company.setCountryCode(request.countryCode());
        if (request.defaultCurrency() != null) company.setDefaultCurrency(request.defaultCurrency());
        if (request.timezone() != null) company.setTimezone(request.timezone());
        if (request.status() != null) company.setStatus(request.status());

        return CompanyResponse.from(companyRepository.save(company));
    }

    public Company getCompany(UUID id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));
    }
}