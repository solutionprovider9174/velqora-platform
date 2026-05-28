INSERT INTO permissions (code, name, description)
VALUES
    ('DASHBOARD_READ', 'Dashboard Read', 'View dashboard summary data'),
    ('REPORT_READ', 'Report Read', 'View reports and operational analytics')
    ON CONFLICT (code) DO NOTHING;