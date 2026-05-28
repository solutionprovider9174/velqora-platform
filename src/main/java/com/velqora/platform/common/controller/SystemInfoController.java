package com.velqora.platform.common.controller;

import com.velqora.platform.company.CompanyRepository;
import com.velqora.platform.security.permission.PermissionRepository;
import com.velqora.platform.security.role.RoleRepository;
import com.velqora.platform.user.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class SystemInfoController {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    public SystemInfoController(
            CompanyRepository companyRepository,
            UserRepository userRepository,
            RoleRepository roleRepository,
            PermissionRepository permissionRepository
    ) {
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }

    @GetMapping("/api/public/system-info")
    public Map<String, Object> systemInfo() {
        return Map.of(
                "companies", companyRepository.count(),
                "users", userRepository.count(),
                "roles", roleRepository.count(),
                "permissions", permissionRepository.count()
        );
    }
}