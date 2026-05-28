CREATE TABLE shipments (
                           id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                           company_id UUID NOT NULL,
                           branch_id UUID,

                           shipment_number VARCHAR(80) NOT NULL UNIQUE,

                           customer_name VARCHAR(180),
                           customer_reference VARCHAR(120),

                           origin_address TEXT,
                           destination_address TEXT,
                           destination_city VARCHAR(120),
                           destination_country_code VARCHAR(10),

                           status VARCHAR(40) NOT NULL DEFAULT 'CREATED',
                           priority VARCHAR(40) NOT NULL DEFAULT 'NORMAL',

                           carrier_name VARCHAR(150),
                           tracking_reference VARCHAR(150),

                           planned_dispatch_date TIMESTAMP,
                           planned_delivery_date TIMESTAMP,
                           actual_delivery_date TIMESTAMP,

                           notes TEXT,

                           created_by UUID,

                           created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                           CONSTRAINT fk_shipments_company
                               FOREIGN KEY (company_id)
                                   REFERENCES companies(id)
                                   ON DELETE CASCADE,

                           CONSTRAINT fk_shipments_branch
                               FOREIGN KEY (branch_id)
                                   REFERENCES branches(id)
                                   ON DELETE SET NULL,

                           CONSTRAINT fk_shipments_created_by
                               FOREIGN KEY (created_by)
                                   REFERENCES users(id)
                                   ON DELETE SET NULL
);

CREATE INDEX idx_shipments_company_id ON shipments(company_id);
CREATE INDEX idx_shipments_branch_id ON shipments(branch_id);
CREATE INDEX idx_shipments_status ON shipments(status);
CREATE INDEX idx_shipments_shipment_number ON shipments(shipment_number);

CREATE TABLE shipment_events (
                                 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                                 shipment_id UUID NOT NULL,
                                 status VARCHAR(40) NOT NULL,
                                 event_type VARCHAR(80) NOT NULL,
                                 description TEXT,
                                 location VARCHAR(180),

                                 created_by UUID,

                                 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                                 CONSTRAINT fk_shipment_events_shipment
                                     FOREIGN KEY (shipment_id)
                                         REFERENCES shipments(id)
                                         ON DELETE CASCADE,

                                 CONSTRAINT fk_shipment_events_created_by
                                     FOREIGN KEY (created_by)
                                         REFERENCES users(id)
                                         ON DELETE SET NULL
);

CREATE INDEX idx_shipment_events_shipment_id ON shipment_events(shipment_id);

INSERT INTO permissions (code, name, description)
VALUES
    ('LOGISTICS_READ', 'Logistics Read', 'View logistics and shipment data'),
    ('LOGISTICS_MANAGE', 'Logistics Manage', 'Manage logistics operations'),
    ('SHIPMENT_READ', 'Shipment Read', 'View shipment records'),
    ('SHIPMENT_MANAGE', 'Shipment Manage', 'Create and update shipment records')
    ON CONFLICT (code) DO NOTHING;