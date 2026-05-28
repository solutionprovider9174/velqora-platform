package com.velqora.platform.equipment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EquipmentEventRepository extends JpaRepository<EquipmentEvent, UUID> {

    List<EquipmentEvent> findByEquipmentAssetIdOrderByCreatedAtDesc(UUID equipmentAssetId);
}