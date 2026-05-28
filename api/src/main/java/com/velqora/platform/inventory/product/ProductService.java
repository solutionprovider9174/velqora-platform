package com.velqora.platform.inventory.product;

import com.velqora.platform.common.enums.Status;
import com.velqora.platform.common.exception.BadRequestException;
import com.velqora.platform.common.exception.ResourceNotFoundException;
import com.velqora.platform.company.Company;
import com.velqora.platform.company.CompanyService;
import com.velqora.platform.inventory.product.dto.CreateProductRequest;
import com.velqora.platform.inventory.product.dto.ProductResponse;
import com.velqora.platform.inventory.product.dto.UpdateProductRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CompanyService companyService;

    public ProductService(
            ProductRepository productRepository,
            CompanyService companyService
    ) {
        this.productRepository = productRepository;
        this.companyService = companyService;
    }

    @Transactional
    public ProductResponse create(CreateProductRequest request) {
        Company company = companyService.getCompany(request.companyId());

        if (productRepository.existsByCompanyIdAndSku(company.getId(), request.sku())) {
            throw new BadRequestException("SKU already exists for this company");
        }

        Product product = new Product();
        product.setCompany(company);
        product.setSku(request.sku());
        product.setName(request.name());
        product.setDescription(request.description());
        product.setCategory(request.category());
        product.setUnitOfMeasure(request.unitOfMeasure() != null ? request.unitOfMeasure() : "UNIT");
        product.setMinimumStockLevel(request.minimumStockLevel() != null ? request.minimumStockLevel() : BigDecimal.ZERO);
        product.setReorderLevel(request.reorderLevel() != null ? request.reorderLevel() : BigDecimal.ZERO);
        product.setStatus(Status.ACTIVE);

        return ProductResponse.from(productRepository.save(product));
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> findAll(UUID companyId) {
        List<Product> products = companyId == null
                ? productRepository.findAll()
                : productRepository.findByCompanyId(companyId);

        return products.stream()
                .map(ProductResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProductResponse findById(UUID id) {
        return ProductResponse.from(getProduct(id));
    }

    @Transactional
    public ProductResponse update(UUID id, UpdateProductRequest request) {
        Product product = getProduct(id);

        if (request.name() != null) product.setName(request.name());
        if (request.description() != null) product.setDescription(request.description());
        if (request.category() != null) product.setCategory(request.category());
        if (request.unitOfMeasure() != null) product.setUnitOfMeasure(request.unitOfMeasure());
        if (request.minimumStockLevel() != null) product.setMinimumStockLevel(request.minimumStockLevel());
        if (request.reorderLevel() != null) product.setReorderLevel(request.reorderLevel());
        if (request.status() != null) product.setStatus(request.status());

        return ProductResponse.from(productRepository.save(product));
    }

    public Product getProduct(UUID id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }
}