CREATE TABLE companies (
                           id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                           name VARCHAR(150) NOT NULL,
                           legal_name VARCHAR(200),
                           registration_number VARCHAR(100),
                           country_code VARCHAR(10),
                           default_currency VARCHAR(10),
                           timezone VARCHAR(80),
                           status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
                           created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE branches (
                          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                          company_id UUID NOT NULL,
                          name VARCHAR(150) NOT NULL,
                          code VARCHAR(50),
                          country_code VARCHAR(10),
                          city VARCHAR(100),
                          address TEXT,
                          timezone VARCHAR(80),
                          status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
                          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                          CONSTRAINT fk_branches_company
                              FOREIGN KEY (company_id)
                                  REFERENCES companies(id)
                                  ON DELETE CASCADE
);

CREATE TABLE users (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       company_id UUID,
                       branch_id UUID,
                       first_name VARCHAR(100) NOT NULL,
                       last_name VARCHAR(100) NOT NULL,
                       email VARCHAR(180) NOT NULL UNIQUE,
                       password_hash VARCHAR(255),
                       phone VARCHAR(50),
                       status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
                       created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                       CONSTRAINT fk_users_company
                           FOREIGN KEY (company_id)
                               REFERENCES companies(id)
                               ON DELETE SET NULL,

                       CONSTRAINT fk_users_branch
                           FOREIGN KEY (branch_id)
                               REFERENCES branches(id)
                               ON DELETE SET NULL
);

CREATE TABLE roles (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       name VARCHAR(100) NOT NULL UNIQUE,
                       description TEXT,
                       system_role BOOLEAN NOT NULL DEFAULT FALSE,
                       created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE permissions (
                             id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                             code VARCHAR(120) NOT NULL UNIQUE,
                             name VARCHAR(150) NOT NULL,
                             description TEXT,
                             created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                             updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
                            user_id UUID NOT NULL,
                            role_id UUID NOT NULL,
                            PRIMARY KEY (user_id, role_id),

                            CONSTRAINT fk_user_roles_user
                                FOREIGN KEY (user_id)
                                    REFERENCES users(id)
                                    ON DELETE CASCADE,

                            CONSTRAINT fk_user_roles_role
                                FOREIGN KEY (role_id)
                                    REFERENCES roles(id)
                                    ON DELETE CASCADE
);

CREATE TABLE role_permissions (
                                  role_id UUID NOT NULL,
                                  permission_id UUID NOT NULL,
                                  PRIMARY KEY (role_id, permission_id),

                                  CONSTRAINT fk_role_permissions_role
                                      FOREIGN KEY (role_id)
                                          REFERENCES roles(id)
                                          ON DELETE CASCADE,

                                  CONSTRAINT fk_role_permissions_permission
                                      FOREIGN KEY (permission_id)
                                          REFERENCES permissions(id)
                                          ON DELETE CASCADE
);

CREATE TABLE audit_logs (
                            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                            company_id UUID,
                            user_id UUID,
                            action VARCHAR(120) NOT NULL,
                            entity_type VARCHAR(120),
                            entity_id UUID,
                            details TEXT,
                            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                            CONSTRAINT fk_audit_logs_company
                                FOREIGN KEY (company_id)
                                    REFERENCES companies(id)
                                    ON DELETE SET NULL,

                            CONSTRAINT fk_audit_logs_user
                                FOREIGN KEY (user_id)
                                    REFERENCES users(id)
                                    ON DELETE SET NULL
);

INSERT INTO permissions (code, name, description)
VALUES
    ('COMPANY_READ', 'Company Read', 'View company information'),
    ('COMPANY_MANAGE', 'Company Manage', 'Manage company information'),
    ('BRANCH_READ', 'Branch Read', 'View branch information'),
    ('BRANCH_MANAGE', 'Branch Manage', 'Manage branches'),
    ('USER_READ', 'User Read', 'View users'),
    ('USER_MANAGE', 'User Manage', 'Manage users'),
    ('ROLE_READ', 'Role Read', 'View roles'),
    ('ROLE_MANAGE', 'Role Manage', 'Manage roles')
    ON CONFLICT (code) DO NOTHING;

INSERT INTO roles (name, description, system_role)
VALUES
    ('SUPER_ADMIN', 'Full platform administrator', TRUE),
    ('COMPANY_ADMIN', 'Company-level administrator', TRUE),
    ('BRANCH_MANAGER', 'Branch-level manager', TRUE),
    ('OPERATIONS_USER', 'Standard operations user', TRUE)
    ON CONFLICT (name) DO NOTHING;