CREATE TABLE equipment_assets (
                                  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                                  company_id UUID NOT NULL,
                                  branch_id UUID,
                                  warehouse_id UUID,
                                  product_id UUID,

                                  asset_tag VARCHAR(120) NOT NULL,
                                  serial_number VARCHAR(150),

                                  equipment_type VARCHAR(120),
                                  manufacturer VARCHAR(150),
                                  model_number VARCHAR(150),

                                  status VARCHAR(50) NOT NULL DEFAULT 'IN_STOCK',
                                  condition_status VARCHAR(50) NOT NULL DEFAULT 'GOOD',

                                  install_location TEXT,
                                  purchase_date DATE,
                                  warranty_expiry_date DATE,

                                  notes TEXT,
                                  created_by UUID,

                                  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                                  CONSTRAINT fk_equipment_assets_company
                                      FOREIGN KEY (company_id)
                                          REFERENCES companies(id)
                                          ON DELETE CASCADE,

                                  CONSTRAINT fk_equipment_assets_branch
                                      FOREIGN KEY (branch_id)
                                          REFERENCES branches(id)
                                          ON DELETE SET NULL,

                                  CONSTRAINT fk_equipment_assets_warehouse
                                      FOREIGN KEY (warehouse_id)
                                          REFERENCES warehouses(id)
                                          ON DELETE SET NULL,

                                  CONSTRAINT fk_equipment_assets_product
                                      FOREIGN KEY (product_id)
                                          REFERENCES products(id)
                                          ON DELETE SET NULL,

                                  CONSTRAINT fk_equipment_assets_created_by
                                      FOREIGN KEY (created_by)
                                          REFERENCES users(id)
                                          ON DELETE SET NULL,

                                  CONSTRAINT uq_equipment_company_asset_tag UNIQUE (company_id, asset_tag),
                                  CONSTRAINT uq_equipment_company_serial_number UNIQUE (company_id, serial_number)
);

CREATE INDEX idx_equipment_assets_company_id ON equipment_assets(company_id);
CREATE INDEX idx_equipment_assets_branch_id ON equipment_assets(branch_id);
CREATE INDEX idx_equipment_assets_warehouse_id ON equipment_assets(warehouse_id);
CREATE INDEX idx_equipment_assets_product_id ON equipment_assets(product_id);
CREATE INDEX idx_equipment_assets_status ON equipment_assets(status);

CREATE TABLE equipment_events (
                                  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                                  equipment_asset_id UUID NOT NULL,

                                  status VARCHAR(50) NOT NULL,
                                  condition_status VARCHAR(50),
                                  event_type VARCHAR(100) NOT NULL,
                                  description TEXT,
                                  location TEXT,

                                  created_by UUID,
                                  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                                  CONSTRAINT fk_equipment_events_asset
                                      FOREIGN KEY (equipment_asset_id)
                                          REFERENCES equipment_assets(id)
                                          ON DELETE CASCADE,

                                  CONSTRAINT fk_equipment_events_created_by
                                      FOREIGN KEY (created_by)
                                          REFERENCES users(id)
                                          ON DELETE SET NULL
);

CREATE INDEX idx_equipment_events_asset_id ON equipment_events(equipment_asset_id);

INSERT INTO permissions (code, name, description)
VALUES
    ('EQUIPMENT_READ', 'Equipment Read', 'View equipment and asset records'),
    ('EQUIPMENT_MANAGE', 'Equipment Manage', 'Create and update equipment and asset records')
    ON CONFLICT (code) DO NOTHING;