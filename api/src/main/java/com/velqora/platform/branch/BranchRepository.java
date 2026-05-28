package com.velqora.platform.branch;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BranchRepository extends JpaRepository<Branch, UUID> {

    List<Branch> findByCompanyId(UUID companyId);

    Optional<Branch> findByCompanyIdAndCode(UUID companyId, String code);

    long countByCompanyId(UUID companyId);
}