'use client'
import { useState } from 'react'

type Tab = 'general' | 'localization' | 'notifications' | 'security' | 'integrations' | 'developer'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'general', label: 'General', icon: 'ti-building' },
  { id: 'localization', label: 'Localization', icon: 'ti-world' },
  { id: 'notifications', label: 'Notifications', icon: 'ti-bell' },
  { id: 'security', label: 'Security & Access', icon: 'ti-shield-lock' },
  { id: 'integrations', label: 'Integrations', icon: 'ti-plug' },
  { id: 'developer', label: 'Developer', icon: 'ti-code' },
]

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('general')

  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">
            Manage company preferences, localization, notifications, security, and platform integrations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 sm:gap-6">
        {/* Tab list */}
        <nav className="card p-2 h-fit lg:sticky lg:top-4">
          <div className="flex lg:flex-col gap-1 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  tab === t.id
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary'
                }`}
              >
                <i className={`ti ${t.icon} text-base`} />
                {t.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Tab content */}
        <div className="space-y-4 sm:space-y-6">
          {tab === 'general' && <GeneralTab />}
          {tab === 'localization' && <LocalizationTab />}
          {tab === 'notifications' && <NotificationsTab />}
          {tab === 'security' && <SecurityTab />}
          {tab === 'integrations' && <IntegrationsTab />}
          {tab === 'developer' && <DeveloperTab />}

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="btn-primary">Save Settings</button>
            <button className="btn-outline">Reset to Defaults</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="card p-4 sm:p-6">
      <div className="pb-3 mb-4 border-b border-border">
        <h2 className="text-base font-bold text-text-primary">{title}</h2>
        {subtitle && <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div className="sm:flex-1">
        <label className="text-sm font-medium text-text-primary">{label}</label>
        {hint && <p className="text-xs text-text-secondary mt-0.5">{hint}</p>}
      </div>
      <div className="sm:w-64">{children}</div>
    </div>
  )
}

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative w-10 h-5 rounded-full transition-colors ${on ? 'bg-brand-600' : 'bg-border'}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  )
}

function GeneralTab() {
  return (
    <Section title="Company Profile" subtitle="Core company information used across the platform">
      <Row label="Company Name"><input className="input" defaultValue="Velqora Enterprises" /></Row>
      <Row label="Legal Name"><input className="input" defaultValue="Velqora Enterprises B.V." /></Row>
      <Row label="Registration Number"><input className="input" defaultValue="NL-9472811" /></Row>
      <Row label="Country">
        <select className="input">
          <option>Netherlands</option><option>United Arab Emirates</option><option>Saudi Arabia</option><option>Germany</option>
        </select>
      </Row>
      <Row label="Default Branch">
        <select className="input"><option>Rotterdam HQ</option><option>Dubai Branch</option><option>Riyadh Branch</option></select>
      </Row>
      <Row label="Company Status">
        <span className="badge badge-success">ACTIVE</span>
      </Row>
    </Section>
  )
}

function LocalizationTab() {
  return (
    <Section title="Localization" subtitle="Language, currency, timezone, date and number formats">
      <Row label="Default Language">
        <select className="input">
          <option>English</option><option>Dutch</option><option>German</option>
          <option>French</option><option>Spanish</option><option>Arabic</option>
        </select>
      </Row>
      <Row label="Default Currency">
        <select className="input">
          <option>EUR — Euro</option><option>USD — US Dollar</option><option>GBP — British Pound</option>
          <option>AED — UAE Dirham</option><option>SAR — Saudi Riyal</option><option>KWD — Kuwaiti Dinar</option>
        </select>
      </Row>
      <Row label="Timezone">
        <select className="input">
          <option>Europe/Amsterdam (UTC+1)</option><option>Asia/Dubai (UTC+4)</option>
          <option>Asia/Riyadh (UTC+3)</option><option>UTC</option>
        </select>
      </Row>
      <Row label="Date Format">
        <select className="input"><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select>
      </Row>
      <Row label="Number Format">
        <select className="input"><option>1,234,567.89 (EU/US)</option><option>1.234.567,89 (DE/IT)</option><option>1 234 567,89 (FR)</option></select>
      </Row>
      <Row label="Measurement Unit">
        <select className="input"><option>Metric (kg, km)</option><option>Imperial (lb, mi)</option></select>
      </Row>
    </Section>
  )
}

function NotificationsTab() {
  return (
    <Section title="Operational Notifications" subtitle="Email and push alerts for key operational events">
      <Row label="Email on shipment status change" hint="Notify operators when a shipment status updates"><Toggle defaultOn /></Row>
      <Row label="Email on low stock alert" hint="Trigger when product drops below reorder level"><Toggle defaultOn /></Row>
      <Row label="Email on equipment status change" hint="Notify on installation, maintenance, retirement events"><Toggle defaultOn /></Row>
      <Row label="Email on warehouse capacity warning" hint="Alert when a warehouse exceeds 85% utilization"><Toggle defaultOn /></Row>
      <Row label="Email on AI monitoring alert" hint="Receive AI-generated operational recommendations"><Toggle /></Row>
      <Row label="Push notifications" hint="Browser and mobile push alerts"><Toggle defaultOn /></Row>
    </Section>
  )
}

function SecurityTab() {
  return (
    <Section title="Security & Access" subtitle="Authentication, access control, and audit policies">
      <Row label="Require strong passwords" hint="Minimum 12 characters with mixed case, numbers, symbols"><Toggle defaultOn /></Row>
      <Row label="Enable two-factor authentication" hint="Require 2FA for all users in this company"><Toggle /></Row>
      <Row label="Session timeout" hint="Auto-logout after period of inactivity">
        <select className="input"><option>30 minutes</option><option>1 hour</option><option>4 hours</option><option>8 hours</option><option>24 hours</option></select>
      </Row>
      <Row label="Role-based access control" hint="Enforce permissions per user role"><Toggle defaultOn /></Row>
      <Row label="Audit logging" hint="Record all create, update, delete actions"><Toggle defaultOn /></Row>
      <Row label="IP allowlist" hint="Restrict access to specific IP ranges"><Toggle /></Row>
    </Section>
  )
}

const INTEGRATIONS = [
  { name: 'Backend API', desc: 'Velqora Spring Boot backend', status: 'Connected', icon: 'ti-server' },
  { name: 'Email Provider', desc: 'Transactional email delivery (SendGrid, Mailgun)', status: 'Planned', icon: 'ti-mail' },
  { name: 'Maps / GPS Provider', desc: 'Google Maps or Mapbox for fleet tracking', status: 'Planned', icon: 'ti-map' },
  { name: 'Payment Provider', desc: 'Stripe, Adyen, or Mollie for invoice payments', status: 'Coming Soon', icon: 'ti-credit-card' },
  { name: 'Accounting System', desc: 'QuickBooks, Xero, SAP, Odoo', status: 'Coming Soon', icon: 'ti-calculator' },
  { name: 'IoT Device Gateway', desc: 'Connect renewable energy IoT telemetry', status: 'Coming Soon', icon: 'ti-broadcast' },
  { name: 'AI Service', desc: 'Forecasting, anomaly detection, recommendations', status: 'Coming Soon', icon: 'ti-brain' },
]

function IntegrationsTab() {
  return (
    <Section title="Integrations" subtitle="External systems connected to Velqora">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {INTEGRATIONS.map((i) => (
          <div key={i.name} className="border border-border rounded-lg p-3 sm:p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
              <i className={`ti ${i.icon} text-brand-600 text-lg`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="font-semibold text-sm text-text-primary">{i.name}</h3>
                <span className={`badge text-2xs ${
                  i.status === 'Connected' ? 'badge-success' :
                  i.status === 'Planned' ? 'badge-info' : 'badge-warning'
                }`}>{i.status.toUpperCase()}</span>
              </div>
              <p className="text-xs text-text-secondary mb-2">{i.desc}</p>
              <button className="text-xs text-brand-600 font-semibold hover:underline">Configure →</button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function DeveloperTab() {
  return (
    <>
      <div className="bg-warning/5 border border-warning/30 rounded-lg p-3 flex items-start gap-2">
        <i className="ti ti-alert-triangle text-warning text-lg flex-shrink-0 mt-0.5" />
        <div className="text-xs text-text-secondary">
          <strong className="text-text-primary">Developer settings.</strong> These options affect platform integration
          and should only be modified by technical administrators.
        </div>
      </div>
      <Section title="Backend API" subtitle="Connection to the Velqora backend service">
        <Row label="Backend API URL" hint="Base URL of the Velqora backend service">
          <input className="input font-mono text-sm" defaultValue="http://localhost:8080" />
        </Row>
        <Row label="API Version">
          <input className="input font-mono text-sm" defaultValue="v1" />
        </Row>
        <Row label="Request Timeout (ms)">
          <input className="input" type="number" defaultValue="15000" />
        </Row>
        <Row label="Enable request retry" hint="Auto-retry idempotent requests on network failure"><Toggle defaultOn /></Row>
      </Section>
      <Section title="API Keys" subtitle="Manage personal access tokens for the Velqora API">
        <div className="text-sm text-text-secondary">
          API key management will be added once user-scoped tokens are introduced in a future release.
        </div>
      </Section>
      <Section title="Webhooks" subtitle="Outbound event notifications to external systems">
        <div className="text-sm text-text-secondary">
          Webhook configuration will be enabled once the eventing service is connected.
        </div>
      </Section>
    </>
  )
}
