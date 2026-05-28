package com.velqora.platform.inventory.product;

import com.velqora.platform.inventory.product.dto.CreateProductRequest;
import com.velqora.platform.inventory.product.dto.ProductResponse;
import com.velqora.platform.inventory.product.dto.UpdateProductRequest;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/inventory/products")
@PreAuthorize("hasAnyRole('SUPER_ADMIN', 'COMPANY_ADMIN', 'BRANCH_MANAGER', 'OPERATIONS_USER')")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ProductResponse create(@Valid @RequestBody CreateProductRequest request) {
        return productService.create(request);
    }

    @GetMapping
    public List<ProductResponse> findAll(@RequestParam(required = false) UUID companyId) {
        return productService.findAll(companyId);
    }

    @GetMapping("/{id}")
    public ProductResponse findById(@PathVariable UUID id) {
        return productService.findById(id);
    }

    @PatchMapping("/{id}")
    public ProductResponse update(
            @PathVariable UUID id,
            @RequestBody UpdateProductRequest request
    ) {
        return productService.update(id, request);
    }
}