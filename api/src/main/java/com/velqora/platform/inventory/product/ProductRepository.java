package com.velqora.platform.inventory.product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {

    List<Product> findByCompanyId(UUID companyId);

    Optional<Product> findByCompanyIdAndSku(UUID companyId, String sku);

    boolean existsByCompanyIdAndSku(UUID companyId, String sku);

    long countByCompanyId(UUID companyId);
}