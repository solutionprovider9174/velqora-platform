import { Upload, FileSpreadsheet, Building2, Users, Package, Truck, Warehouse, Receipt, Box } from 'lucide-react'

const IMPORTS = [
  { icon: <Users size={20} />, title: 'Customer Import', desc: 'Migrate customer records from existing CRM or ERP systems.', count: '0 imported', color: 'bg-brand-50 text-brand-600' },
  { icon: <Building2 size={20} />, title: 'Supplier Import', desc: 'Import supplier details, contacts, and procurement history.', count: '0 imported', color: 'bg-info/10 text-info' },
  { icon: <Package size={20} />, title: 'Product Import', desc: 'Bulk import product catalog with SKUs, categories, and pricing.', count: '0 imported', color: 'bg-purple-100 text-purple-700' },
  { icon: <Warehouse size={20} />, title: 'Inventory Import', desc: 'Import current stock levels, balances, and warehouse allocations.', count: '0 imported', color: 'bg-success/10 text-success' },
  { icon: <Warehouse size={20} />, title: 'Warehouse Import', desc: 'Migrate warehouse master data, zones, and capacity configuration.', count: '0 imported', color: 'bg-amber-100 text-amber-700' },
  { icon: <Truck size={20} />, title: 'Fleet Import', desc: 'Import vehicle records, driver assignments, and fleet metadata.', count: 'Coming soon', color: 'bg-slate-100 text-slate-600' },
  { icon: <Receipt size={20} />, title: 'Financial Records Import', desc: 'Migrate invoices, payment history, and accounting data.', count: 'Coming soon', color: 'bg-emerald-100 text-emerald-700' },
  { icon: <Truck size={20} />, title: 'Shipment History Import', desc: 'Import historical shipment records for analytics and reporting.', count: '0 imported', color: 'bg-indigo-100 text-indigo-700' },
  { icon: <Box size={20} />, title: 'Equipment Asset Import', desc: 'Bulk import equipment assets with serial numbers and lifecycle data.', count: '0 imported', color: 'bg-rose-100 text-rose-700' },
]

const STEPS = [
  { n: 1, t: 'Upload file', d: 'Upload your CSV, Excel, or JSON export' },
  { n: 2, t: 'Map columns', d: 'Match your file columns to Velqora fields' },
  { n: 3, t: 'Validate data', d: 'Review automatic validation results' },
  { n: 4, t: 'Preview records', d: 'Confirm records before import' },
  { n: 5, t: 'Import', d: 'Run the import and monitor progress' },
  { n: 6, t: 'Review report', d: 'Get a migration summary with errors and successes' },
]

export default function OnboardingPage() {
  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2">Onboarding &amp; Migration <span className="badge bg-slate-100 text-slate-600 border border-slate-200">Roadmap</span></h1>
          <p className="page-subtitle">Import company data, operational records, and existing system exports to accelerate customer onboarding.</p>
        </div>
        <button className="btn-primary text-xs sm:text-sm"><Upload size={14} /> Start Import</button>
      </div>

      <div className="card p-4 sm:p-6">
        <h3 className="text-sm font-bold text-text-primary mb-4">Import Workflow</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {STEPS.map(s => (
            <div key={s.n} className="text-center p-3 rounded-xl border border-border bg-surface-secondary">
              <div className="w-9 h-9 rounded-full bg-brand-600 text-white font-bold text-sm flex items-center justify-center mx-auto mb-2">{s.n}</div>
              <p className="text-xs font-bold text-text-primary">{s.t}</p>
              <p className="text-2xs text-text-secondary mt-1">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-text-primary mb-3">Data Import Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {IMPORTS.map(imp => (
            <div key={imp.title} className="card-hover p-4 group">
              <div className={`w-11 h-11 rounded-xl ${imp.color} flex items-center justify-center mb-3`}>{imp.icon}</div>
              <h4 className="text-sm font-bold text-text-primary mb-1">{imp.title}</h4>
              <p className="text-xs text-text-secondary leading-relaxed mb-3">{imp.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xs text-text-disabled">{imp.count}</span>
                <button className="text-xs text-brand-600 font-semibold hover:underline flex items-center gap-1">
                  <FileSpreadsheet size={12} /> Import
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-4 sm:p-5 bg-brand-50/30 border border-brand-100">
        <div className="flex items-start gap-3">
          <Upload size={20} className="text-brand-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-text-primary">Onboarding Foundation</h3>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
              The Velqora onboarding module is being prepared to accelerate customer migrations from existing ERP, CRM, accounting, and inventory systems. CSV templates, column mapping, validation rules, and migration reports will be added progressively.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
