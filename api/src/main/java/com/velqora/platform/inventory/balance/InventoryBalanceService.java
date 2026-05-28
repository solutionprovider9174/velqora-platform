package com.velqora.platform.inventory.balance;

import com.velqora.platform.inventory.balance.dto.InventoryBalanceResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class InventoryBalanceService {

    private final InventoryBalanceRepository inventoryBalanceRepository;

    public InventoryBalanceService(InventoryBalanceRepository inventoryBalanceRepository) {
        this.inventoryBalanceRepository = inventoryBalanceRepository;
    }

    @Transactional(readOnly = true)
    public List<InventoryBalanceResponse> findAll(UUID companyId, UUID warehouseId) {
        List<InventoryBalance> balances;

        if (warehouseId != null) {
            balances = inventoryBalanceRepository.findByWarehouseId(warehouseId);
        } else if (companyId != null) {
            balances = inventoryBalanceRepository.findByCompanyId(companyId);
        } else {
            balances = inventoryBalanceRepository.findAll();
        }

        return balances.stream()
                .map(InventoryBalanceResponse::from)
                .toList();
    }
}