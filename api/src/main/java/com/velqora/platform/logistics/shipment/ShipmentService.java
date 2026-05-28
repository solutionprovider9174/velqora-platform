package com.velqora.platform.logistics.shipment;

import com.velqora.platform.branch.Branch;
import com.velqora.platform.branch.BranchService;
import com.velqora.platform.common.exception.BadRequestException;
import com.velqora.platform.common.exception.ResourceNotFoundException;
import com.velqora.platform.company.Company;
import com.velqora.platform.company.CompanyService;
import com.velqora.platform.logistics.enums.ShipmentPriority;
import com.velqora.platform.logistics.enums.ShipmentStatus;
import com.velqora.platform.logistics.shipment.dto.*;
import com.velqora.platform.security.UserPrincipal;
import com.velqora.platform.user.User;
import com.velqora.platform.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
public class ShipmentService {

    private final ShipmentRepository shipmentRepository;
    private final ShipmentEventRepository shipmentEventRepository;
    private final CompanyService companyService;
    private final BranchService branchService;
    private final UserService userService;

    public ShipmentService(
            ShipmentRepository shipmentRepository,
            ShipmentEventRepository shipmentEventRepository,
            CompanyService companyService,
            BranchService branchService,
            UserService userService
    ) {
        this.shipmentRepository = shipmentRepository;
        this.shipmentEventRepository = shipmentEventRepository;
        this.companyService = companyService;
        this.branchService = branchService;
        this.userService = userService;
    }

    @Transactional
    public ShipmentResponse create(CreateShipmentRequest request) {
        Company company = companyService.getCompany(request.companyId());

        Branch branch = null;
        if (request.branchId() != null) {
            branch = branchService.getBranch(request.branchId());
            validateBranchBelongsToCompany(branch, company);
        }

        User currentUser = getCurrentUser();

        Shipment shipment = new Shipment();
        shipment.setCompany(company);
        shipment.setBranch(branch);
        shipment.setShipmentNumber(generateShipmentNumber());
        shipment.setCustomerName(request.customerName());
        shipment.setCustomerReference(request.customerReference());
        shipment.setOriginAddress(request.originAddress());
        shipment.setDestinationAddress(request.destinationAddress());
        shipment.setDestinationCity(request.destinationCity());
        shipment.setDestinationCountryCode(request.destinationCountryCode());
        shipment.setPriority(request.priority() != null ? request.priority() : ShipmentPriority.NORMAL);
        shipment.setCarrierName(request.carrierName());
        shipment.setTrackingReference(request.trackingReference());
        shipment.setPlannedDispatchDate(request.plannedDispatchDate());
        shipment.setPlannedDeliveryDate(request.plannedDeliveryDate());
        shipment.setNotes(request.notes());
        shipment.setStatus(ShipmentStatus.CREATED);
        shipment.setCreatedBy(currentUser);

        Shipment saved = shipmentRepository.save(shipment);

        createEvent(
                saved,
                ShipmentStatus.CREATED,
                "SHIPMENT_CREATED",
                "Shipment created",
                null,
                currentUser
        );

        return ShipmentResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public Page<ShipmentResponse> search(
            UUID companyId,
            UUID branchId,
            ShipmentStatus status,
            Pageable pageable
    ) {
        return shipmentRepository.search(companyId, branchId, status, pageable)
                .map(ShipmentResponse::from);
    }

    @Transactional(readOnly = true)
    public ShipmentResponse findById(UUID id) {
        return ShipmentResponse.from(getShipment(id));
    }

    @Transactional
    public ShipmentResponse update(UUID id, UpdateShipmentRequest request) {
        Shipment shipment = getShipment(id);

        if (request.branchId() != null) {
            Branch branch = branchService.getBranch(request.branchId());
            validateBranchBelongsToCompany(branch, shipment.getCompany());
            shipment.setBranch(branch);
        }

        if (request.customerName() != null) shipment.setCustomerName(request.customerName());
        if (request.customerReference() != null) shipment.setCustomerReference(request.customerReference());
        if (request.originAddress() != null) shipment.setOriginAddress(request.originAddress());
        if (request.destinationAddress() != null) shipment.setDestinationAddress(request.destinationAddress());
        if (request.destinationCity() != null) shipment.setDestinationCity(request.destinationCity());
        if (request.destinationCountryCode() != null) shipment.setDestinationCountryCode(request.destinationCountryCode());
        if (request.priority() != null) shipment.setPriority(request.priority());
        if (request.carrierName() != null) shipment.setCarrierName(request.carrierName());
        if (request.trackingReference() != null) shipment.setTrackingReference(request.trackingReference());
        if (request.plannedDispatchDate() != null) shipment.setPlannedDispatchDate(request.plannedDispatchDate());
        if (request.plannedDeliveryDate() != null) shipment.setPlannedDeliveryDate(request.plannedDeliveryDate());
        if (request.actualDeliveryDate() != null) shipment.setActualDeliveryDate(request.actualDeliveryDate());
        if (request.notes() != null) shipment.setNotes(request.notes());

        Shipment saved = shipmentRepository.save(shipment);

        createEvent(
                saved,
                saved.getStatus(),
                "SHIPMENT_UPDATED",
                "Shipment details updated",
                null,
                getCurrentUser()
        );

        return ShipmentResponse.from(saved);
    }

    @Transactional
    public ShipmentResponse updateStatus(UUID id, UpdateShipmentStatusRequest request) {
        Shipment shipment = getShipment(id);

        shipment.setStatus(request.status());

        if (request.status() == ShipmentStatus.DELIVERED) {
            shipment.setActualDeliveryDate(LocalDateTime.now());
        }

        Shipment saved = shipmentRepository.save(shipment);

        createEvent(
                saved,
                request.status(),
                "STATUS_UPDATED",
                request.description() != null ? request.description() : "Shipment status updated",
                request.location(),
                getCurrentUser()
        );

        return ShipmentResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public List<ShipmentEventResponse> findEvents(UUID shipmentId) {
        getShipment(shipmentId);

        return shipmentEventRepository.findByShipmentIdOrderByCreatedAtDesc(shipmentId)
                .stream()
                .map(ShipmentEventResponse::from)
                .toList();
    }

    public Shipment getShipment(UUID id) {
        return shipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Shipment not found"));
    }

    private void createEvent(
            Shipment shipment,
            ShipmentStatus status,
            String eventType,
            String description,
            String location,
            User createdBy
    ) {
        ShipmentEvent event = new ShipmentEvent();
        event.setShipment(shipment);
        event.setStatus(status);
        event.setEventType(eventType);
        event.setDescription(description);
        event.setLocation(location);
        event.setCreatedBy(createdBy);

        shipmentEventRepository.save(event);
    }

    private String generateShipmentNumber() {
        String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        String shipmentNumber = "SHP-" + timestamp + "-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();

        while (shipmentRepository.existsByShipmentNumber(shipmentNumber)) {
            shipmentNumber = "SHP-" + timestamp + "-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        }

        return shipmentNumber;
    }

    private void validateBranchBelongsToCompany(Branch branch, Company company) {
        if (!branch.getCompany().getId().equals(company.getId())) {
            throw new BadRequestException("Branch does not belong to selected company");
        }
    }

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserPrincipal userPrincipal) {
            return userService.getUser(userPrincipal.getId());
        }

        return null;
    }
}