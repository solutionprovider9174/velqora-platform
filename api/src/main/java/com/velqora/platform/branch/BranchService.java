package com.velqora.platform.branch;

import com.velqora.platform.branch.dto.BranchResponse;
import com.velqora.platform.branch.dto.CreateBranchRequest;
import com.velqora.platform.branch.dto.UpdateBranchRequest;
import com.velqora.platform.common.enums.Status;
import com.velqora.platform.common.exception.ResourceNotFoundException;
import com.velqora.platform.company.Company;
import com.velqora.platform.company.CompanyService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class BranchService {

    private final BranchRepository branchRepository;
    private final CompanyService companyService;

    public BranchService(
            BranchRepository branchRepository,
            CompanyService companyService
    ) {
        this.branchRepository = branchRepository;
        this.companyService = companyService;
    }

    @Transactional
    public BranchResponse create(CreateBranchRequest request) {
        Company company = companyService.getCompany(request.companyId());

        Branch branch = new Branch();
        branch.setCompany(company);
        branch.setName(request.name());
        branch.setCode(request.code());
        branch.setCountryCode(request.countryCode());
        branch.setCity(request.city());
        branch.setAddress(request.address());
        branch.setTimezone(request.timezone());
        branch.setStatus(Status.ACTIVE);

        return BranchResponse.from(branchRepository.save(branch));
    }

    @Transactional(readOnly = true)
    public List<BranchResponse> findAll(UUID companyId) {
        List<Branch> branches = companyId == null
                ? branchRepository.findAll()
                : branchRepository.findByCompanyId(companyId);

        return branches.stream()
                .map(BranchResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public BranchResponse findById(UUID id) {
        return BranchResponse.from(getBranch(id));
    }

    @Transactional
    public BranchResponse update(UUID id, UpdateBranchRequest request) {
        Branch branch = getBranch(id);

        if (request.name() != null) branch.setName(request.name());
        if (request.code() != null) branch.setCode(request.code());
        if (request.countryCode() != null) branch.setCountryCode(request.countryCode());
        if (request.city() != null) branch.setCity(request.city());
        if (request.address() != null) branch.setAddress(request.address());
        if (request.timezone() != null) branch.setTimezone(request.timezone());
        if (request.status() != null) branch.setStatus(request.status());

        return BranchResponse.from(branchRepository.save(branch));
    }

    public Branch getBranch(UUID id) {
        return branchRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found"));
    }
}