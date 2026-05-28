package com.velqora.platform.company;

import com.velqora.platform.company.dto.CompanyResponse;
import com.velqora.platform.company.dto.CreateCompanyRequest;
import com.velqora.platform.company.dto.UpdateCompanyRequest;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/companies")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping
    public CompanyResponse create(@Valid @RequestBody CreateCompanyRequest request) {
        return companyService.create(request);
    }

    @GetMapping
    public List<CompanyResponse> findAll() {
        return companyService.findAll();
    }

    @GetMapping("/{id}")
    public CompanyResponse findById(@PathVariable UUID id) {
        return companyService.findById(id);
    }

    @PatchMapping("/{id}")
    public CompanyResponse update(
            @PathVariable UUID id,
            @RequestBody UpdateCompanyRequest request
    ) {
        return companyService.update(id, request);
    }
}