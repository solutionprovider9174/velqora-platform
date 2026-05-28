CREATE TABLE warehouses (
                            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                            company_id UUID NOT NULL,
                            branch_id UUID,

                            name VARCHAR(150) NOT NULL,
                            code VARCHAR(80) NOT NULL,
                            country_code VARCHAR(10),
                            city VARCHAR(120),
                            address TEXT,

                            status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',

                            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                            CONSTRAINT fk_warehouses_company
                                FOREIGN KEY (company_id)
                                    REFERENCES companies(id)
                                    ON DELETE CASCADE,

                            CONSTRAINT fk_warehouses_branch
                                FOREIGN KEY (branch_id)
                                    REFERENCES branches(id)
                                    ON DELETE SET NULL,

                            CONSTRAINT uq_warehouse_company_code UNIQUE (company_id, code)
);

CREATE INDEX idx_warehouses_company_id ON warehouses(company_id);
CREATE INDEX idx_warehouses_branch_id ON warehouses(branch_id);

CREATE TABLE products (
                          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                          company_id UUID NOT NULL,

                          sku VARCHAR(100) NOT NULL,
                          name VARCHAR(180) NOT NULL,
                          description TEXT,
                          category VARCHAR(120),
                          unit_of_measure VARCHAR(40) NOT NULL DEFAULT 'UNIT',

                          minimum_stock_level NUMERIC(14, 2) NOT NULL DEFAULT 0,
                          reorder_level NUMERIC(14, 2) NOT NULL DEFAULT 0,

                          status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',

                          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                          CONSTRAINT fk_products_company
                              FOREIGN KEY (company_id)
                                  REFERENCES companies(id)
                                  ON DELETE CASCADE,

                          CONSTRAINT uq_products_company_sku UNIQUE (company_id, sku)
);

CREATE INDEX idx_products_company_id ON products(company_id);
CREATE INDEX idx_products_sku ON products(sku);

CREATE TABLE inventory_balances (
                                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                                    company_id UUID NOT NULL,
                                    warehouse_id UUID NOT NULL,
                                    product_id UUID NOT NULL,

                                    quantity_on_hand NUMERIC(14, 2) NOT NULL DEFAULT 0,
                                    reserved_quantity NUMERIC(14, 2) NOT NULL DEFAULT 0,

                                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                                    CONSTRAINT fk_inventory_balances_company
                                        FOREIGN KEY (company_id)
                                            REFERENCES companies(id)
                                            ON DELETE CASCADE,

                                    CONSTRAINT fk_inventory_balances_warehouse
                                        FOREIGN KEY (warehouse_id)
                                            REFERENCES warehouses(id)
                                            ON DELETE CASCADE,

                                    CONSTRAINT fk_inventory_balances_product
                                        FOREIGN KEY (product_id)
                                            REFERENCES products(id)
                                            ON DELETE CASCADE,

                                    CONSTRAINT uq_inventory_balance UNIQUE (company_id, warehouse_id, product_id)
);

CREATE INDEX idx_inventory_balances_company_id ON inventory_balances(company_id);
CREATE INDEX idx_inventory_balances_warehouse_id ON inventory_balances(warehouse_id);
CREATE INDEX idx_inventory_balances_product_id ON inventory_balances(product_id);

CREATE TABLE stock_movements (
                                 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                                 company_id UUID NOT NULL,
                                 product_id UUID NOT NULL,

                                 source_warehouse_id UUID,
                                 destination_warehouse_id UUID,

                                 movement_type VARCHAR(40) NOT NULL,
                                 quantity NUMERIC(14, 2) NOT NULL,

                                 reference_type VARCHAR(80),
                                 reference_number VARCHAR(120),
                                 reason TEXT,

                                 created_by UUID,
                                 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                                 CONSTRAINT fk_stock_movements_company
                                     FOREIGN KEY (company_id)
                                         REFERENCES companies(id)
                                         ON DELETE CASCADE,

                                 CONSTRAINT fk_stock_movements_product
                                     FOREIGN KEY (product_id)
                                         REFERENCES products(id)
                                         ON DELETE CASCADE,

                                 CONSTRAINT fk_stock_movements_source_warehouse
                                     FOREIGN KEY (source_warehouse_id)
                                         REFERENCES warehouses(id)
                                         ON DELETE SET NULL,

                                 CONSTRAINT fk_stock_movements_destination_warehouse
                                     FOREIGN KEY (destination_warehouse_id)
                                         REFERENCES warehouses(id)
                                         ON DELETE SET NULL,

                                 CONSTRAINT fk_stock_movements_created_by
                                     FOREIGN KEY (created_by)
                                         REFERENCES users(id)
                                         ON DELETE SET NULL
);

CREATE INDEX idx_stock_movements_company_id ON stock_movements(company_id);
CREATE INDEX idx_stock_movements_product_id ON stock_movements(product_id);
CREATE INDEX idx_stock_movements_source_warehouse_id ON stock_movements(source_warehouse_id);
CREATE INDEX idx_stock_movements_destination_warehouse_id ON stock_movements(destination_warehouse_id);

INSERT INTO permissions (code, name, description)
VALUES
    ('WAREHOUSE_READ', 'Warehouse Read', 'View warehouse records'),
    ('WAREHOUSE_MANAGE', 'Warehouse Manage', 'Create and update warehouse records'),
    ('PRODUCT_READ', 'Product Read', 'View product records'),
    ('PRODUCT_MANAGE', 'Product Manage', 'Create and update product records'),
    ('INVENTORY_READ', 'Inventory Read', 'View inventory balances and stock movement history'),
    ('INVENTORY_MANAGE', 'Inventory Manage', 'Manage stock movements and inventory balances')
    ON CONFLICT (code) DO NOTHING;