package com.velqora.platform.inventory.warehouse;

import com.velqora.platform.branch.Branch;
import com.velqora.platform.branch.BranchService;
import com.velqora.platform.common.enums.Status;
import com.velqora.platform.common.exception.BadRequestException;
import com.velqora.platform.common.exception.ResourceNotFoundException;
import com.velqora.platform.company.Company;
import com.velqora.platform.company.CompanyService;
import com.velqora.platform.inventory.warehouse.dto.CreateWarehouseRequest;
import com.velqora.platform.inventory.warehouse.dto.UpdateWarehouseRequest;
import com.velqora.platform.inventory.warehouse.dto.WarehouseResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class WarehouseService {

    private final WarehouseRepository warehouseRepository;
    private final CompanyService companyService;
    private final BranchService branchService;

    public WarehouseService(
            WarehouseRepository warehouseRepository,
            CompanyService companyService,
            BranchService branchService
    ) {
        this.warehouseRepository = warehouseRepository;
        this.companyService = companyService;
        this.branchService = branchService;
    }

    @Transactional
    public WarehouseResponse create(CreateWarehouseRequest request) {
        Company company = companyService.getCompany(request.companyId());

        if (warehouseRepository.existsByCompanyIdAndCode(company.getId(), request.code())) {
            throw new BadRequestException("Warehouse code already exists for this company");
        }

        Branch branch = null;
        if (request.branchId() != null) {
            branch = branchService.getBranch(request.branchId());

            if (!branch.getCompany().getId().equals(company.getId())) {
                throw new BadRequestException("Branch does not belong to selected company");
            }
        }

        Warehouse warehouse = new Warehouse();
        warehouse.setCompany(company);
        warehouse.setBranch(branch);
        warehouse.setName(request.name());
        warehouse.setCode(request.code());
        warehouse.setCountryCode(request.countryCode());
        warehouse.setCity(request.city());
        warehouse.setAddress(request.address());
        warehouse.setStatus(Status.ACTIVE);

        return WarehouseResponse.from(warehouseRepository.save(warehouse));
    }

    @Transactional(readOnly = true)
    public List<WarehouseResponse> findAll(UUID companyId) {
        List<Warehouse> warehouses = companyId == null
                ? warehouseRepository.findAll()
                : warehouseRepository.findByCompanyId(companyId);

        return warehouses.stream()
                .map(WarehouseResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public WarehouseResponse findById(UUID id) {
        return WarehouseResponse.from(getWarehouse(id));
    }

    @Transactional
    public WarehouseResponse update(UUID id, UpdateWarehouseRequest request) {
        Warehouse warehouse = getWarehouse(id);

        if (request.branchId() != null) {
            Branch branch = branchService.getBranch(request.branchId());

            if (!branch.getCompany().getId().equals(warehouse.getCompany().getId())) {
                throw new BadRequestException("Branch does not belong to selected company");
            }

            warehouse.setBranch(branch);
        }

        if (request.name() != null) warehouse.setName(request.name());
        if (request.code() != null) warehouse.setCode(request.code());
        if (request.countryCode() != null) warehouse.setCountryCode(request.countryCode());
        if (request.city() != null) warehouse.setCity(request.city());
        if (request.address() != null) warehouse.setAddress(request.address());
        if (request.status() != null) warehouse.setStatus(request.status());

        return WarehouseResponse.from(warehouseRepository.save(warehouse));
    }

    public Warehouse getWarehouse(UUID id) {
        return warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found"));
    }
}