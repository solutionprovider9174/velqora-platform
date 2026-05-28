package com.velqora.platform.user;

import com.velqora.platform.branch.Branch;
import com.velqora.platform.branch.BranchService;
import com.velqora.platform.common.enums.Status;
import com.velqora.platform.common.exception.BadRequestException;
import com.velqora.platform.common.exception.ResourceNotFoundException;
import com.velqora.platform.company.Company;
import com.velqora.platform.company.CompanyService;
import com.velqora.platform.security.role.Role;
import com.velqora.platform.security.role.RoleRepository;
import com.velqora.platform.user.dto.CreateUserRequest;
import com.velqora.platform.user.dto.UpdateUserRequest;
import com.velqora.platform.user.dto.UserResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CompanyService companyService;
    private final BranchService branchService;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            CompanyService companyService,
            BranchService branchService,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.companyService = companyService;
        this.branchService = branchService;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse create(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email already exists");
        }

        Company company = companyService.getCompany(request.companyId());
        Branch branch = request.branchId() != null ? branchService.getBranch(request.branchId()) : null;

        User user = new User();
        user.setCompany(company);
        user.setBranch(branch);
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setEmail(request.email().toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setPhone(request.phone());
        user.setStatus(Status.ACTIVE);
        user.setRoles(resolveRoles(request.roles()));

        return UserResponse.from(userRepository.save(user));
    }

    @Transactional(readOnly = true)
    public List<UserResponse> findAll() {
        return userRepository.findAll()
                .stream()
                .map(UserResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public UserResponse findById(UUID id) {
        return UserResponse.from(getUser(id));
    }

    @Transactional
    public UserResponse update(UUID id, UpdateUserRequest request) {
        User user = getUser(id);

        if (request.companyId() != null) {
            Company company = companyService.getCompany(request.companyId());
            user.setCompany(company);
        }

        if (request.branchId() != null) {
            Branch branch = branchService.getBranch(request.branchId());
            user.setBranch(branch);
        }

        if (request.firstName() != null) user.setFirstName(request.firstName());
        if (request.lastName() != null) user.setLastName(request.lastName());
        if (request.password() != null) user.setPasswordHash(passwordEncoder.encode(request.password()));
        if (request.phone() != null) user.setPhone(request.phone());
        if (request.status() != null) user.setStatus(request.status());

        if (request.roles() != null) {
            user.setRoles(resolveRoles(request.roles()));
        }

        return UserResponse.from(userRepository.save(user));
    }

    public User getUser(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private Set<Role> resolveRoles(Set<String> roleNames) {
        Set<Role> roles = new HashSet<>();

        if (roleNames == null || roleNames.isEmpty()) {
            Role defaultRole = roleRepository.findByName("OPERATIONS_USER")
                    .orElseThrow(() -> new ResourceNotFoundException("Default role not found"));
            roles.add(defaultRole);
            return roles;
        }

        for (String roleName : roleNames) {
            Role role = roleRepository.findByName(roleName)
                    .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleName));
            roles.add(role);
        }

        return roles;
    }
}