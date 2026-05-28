package com.velqora.platform.branch;

import com.velqora.platform.branch.dto.BranchResponse;
import com.velqora.platform.branch.dto.CreateBranchRequest;
import com.velqora.platform.branch.dto.UpdateBranchRequest;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/branches")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class BranchController {

    private final BranchService branchService;

    public BranchController(BranchService branchService) {
        this.branchService = branchService;
    }

    @PostMapping
    public BranchResponse create(@Valid @RequestBody CreateBranchRequest request) {
        return branchService.create(request);
    }

    @GetMapping
    public List<BranchResponse> findAll(
            @RequestParam(required = false) UUID companyId
    ) {
        return branchService.findAll(companyId);
    }

    @GetMapping("/{id}")
    public BranchResponse findById(@PathVariable UUID id) {
        return branchService.findById(id);
    }

    @PatchMapping("/{id}")
    public BranchResponse update(
            @PathVariable UUID id,
            @RequestBody UpdateBranchRequest request
    ) {
        return branchService.update(id, request);
    }
}