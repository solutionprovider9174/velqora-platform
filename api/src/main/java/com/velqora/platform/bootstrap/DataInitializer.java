package com.velqora.platform.bootstrap;

import com.velqora.platform.branch.Branch;
import com.velqora.platform.branch.BranchRepository;
import com.velqora.platform.common.enums.Status;
import com.velqora.platform.company.Company;
import com.velqora.platform.company.CompanyRepository;
import com.velqora.platform.security.permission.PermissionRepository;
import com.velqora.platform.security.role.Role;
import com.velqora.platform.security.role.RoleRepository;
import com.velqora.platform.user.User;
import com.velqora.platform.user.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CompanyRepository companyRepository;
    private final BranchRepository branchRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${velqora.bootstrap.admin-email}")
    private String adminEmail;

    @Value("${velqora.bootstrap.admin-password}")
    private String adminPassword;

    public DataInitializer(
            CompanyRepository companyRepository,
            BranchRepository branchRepository,
            UserRepository userRepository,
            RoleRepository roleRepository,
            PermissionRepository permissionRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.companyRepository = companyRepository;
        this.branchRepository = branchRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        Company company = companyRepository.findByName("Velqora Internal")
                .orElseGet(() -> {
                    Company newCompany = new Company();
                    newCompany.setName("Velqora Internal");
                    newCompany.setLegalName("Velqora Internal");
                    newCompany.setCountryCode("NL");
                    newCompany.setDefaultCurrency("EUR");
                    newCompany.setTimezone("Europe/Amsterdam");
                    newCompany.setStatus(Status.ACTIVE);
                    return companyRepository.save(newCompany);
                });

        Branch branch = branchRepository.findByCompanyIdAndCode(company.getId(), "HQ")
                .orElseGet(() -> {
                    Branch newBranch = new Branch();
                    newBranch.setCompany(company);
                    newBranch.setName("Head Office");
                    newBranch.setCode("HQ");
                    newBranch.setCountryCode("NL");
                    newBranch.setCity("Amsterdam");
                    newBranch.setTimezone("Europe/Amsterdam");
                    newBranch.setStatus(Status.ACTIVE);
                    return branchRepository.save(newBranch);
                });

        Role superAdminRole = roleRepository.findByName("SUPER_ADMIN")
                .orElseThrow(() -> new IllegalStateException("SUPER_ADMIN role not found"));

        superAdminRole.setPermissions(new HashSet<>(permissionRepository.findAll()));
        roleRepository.save(superAdminRole);

        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User();
            admin.setCompany(company);
            admin.setBranch(branch);
            admin.setFirstName("Platform");
            admin.setLastName("Admin");
            admin.setEmail(adminEmail);
            admin.setPasswordHash(passwordEncoder.encode(adminPassword));
            admin.setStatus(Status.ACTIVE);
            admin.getRoles().add(superAdminRole);

            userRepository.save(admin);
        }
    }
}