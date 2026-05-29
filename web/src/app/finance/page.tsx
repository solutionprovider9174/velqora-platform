import { Plus, Download } from 'lucide-react'

const INVOICES = [
  { id:'INV-2024-001', company:'Gulf Freight LLC', ref:'GF-091', amount:'12,500', cur:'EUR', due:'2024-02-15', status:'Paid' },
  { id:'INV-2024-002', company:'EuroTrans GmbH', ref:'ET-082', amount:'8,200', cur:'EUR', due:'2024-02-20', status:'Pending' },
  { id:'INV-2024-003', company:'AsiaCargo Co.', ref:'AC-067', amount:'22,800', cur:'USD', due:'2024-02-10', status:'Overdue' },
  { id:'INV-2024-004', company:'Nordic Shipping', ref:'NS-044', amount:'5,600', cur:'EUR', due:'2024-03-01', status:'Paid' },
]
const SB: Record<string,string> = { Paid:'badge-success', Pending:'badge-warning', Overdue:'badge-danger', Draft:'badge-gray', Cancelled:'badge-gray' }

export default function FinancePage() {
  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2">Finance &amp; Billing <span className="badge bg-slate-100 text-slate-600 border border-slate-200">Roadmap</span></h1>
          <p className="page-subtitle">Track invoices, payment status, billing readiness, and future accounting integrations.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline text-xs sm:text-sm"><Download size={14} /> Export</button>
          <button className="btn-primary text-xs sm:text-sm"><Plus size={14} /> New Invoice</button>
        </div>
      </div>

      <div className="kpi-grid-4">
        {[
          { l:'Total Invoiced', v:'€2.45M', c:'text-brand-700 bg-brand-50' },
          { l:'Outstanding Balance', v:'€184K', c:'text-warning bg-warning/10' },
          { l:'Overdue Invoices', v:'€22.8K', c:'text-danger bg-danger/10' },
          { l:'Collected This Month', v:'€890K', c:'text-success bg-success/10' },
        ].map(k => (
          <div key={k.l} className={`rounded-xl p-3 sm:p-4 ${k.c}`}>
            <p className="text-xl sm:text-2xl font-black">{k.v}</p>
            <p className="text-xs mt-0.5 opacity-80">{k.l}</p>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-border"><h3 className="text-sm font-bold text-text-primary">Recent Invoices</h3></div>
        <div className="overflow-x-auto">
          <table className="table-base min-w-[640px]">
            <thead><tr>
              <th className="table-th">Invoice No.</th>
              <th className="table-th">Company / Client</th>
              <th className="table-th hidden md:table-cell">Reference</th>
              <th className="table-th">Amount</th>
              <th className="table-th hidden lg:table-cell">Currency</th>
              <th className="table-th hidden lg:table-cell">Due Date</th>
              <th className="table-th">Status</th>
              <th className="table-th"></th>
            </tr></thead>
            <tbody>
              {INVOICES.map(i => (
                <tr key={i.id} className="table-row">
                  <td className="table-td font-semibold text-brand-700 text-xs sm:text-sm">{i.id}</td>
                  <td className="table-td text-text-primary text-xs sm:text-sm">{i.company}</td>
                  <td className="table-td text-text-secondary text-xs hidden md:table-cell">{i.ref}</td>
                  <td className="table-td font-bold text-text-primary">{i.amount}</td>
                  <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{i.cur}</td>
                  <td className="table-td text-text-secondary text-xs hidden lg:table-cell">{i.due}</td>
                  <td className="table-td"><span className={`${SB[i.status]} badge`}><span className="w-1.5 h-1.5 rounded-full bg-current"/>{i.status}</span></td>
                  <td className="table-td"><button className="text-xs text-brand-600 hover:underline font-semibold">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-4 sm:p-5 bg-brand-50/30 border border-brand-100">
        <h3 className="text-sm font-bold text-text-primary">Finance Integration Readiness</h3>
        <p className="text-xs text-text-secondary mt-2 leading-relaxed">This module is prepared for future invoicing, payments, multi-currency billing, tax reporting, and accounting integrations.</p>
      </div>
    </div>
  )
}
