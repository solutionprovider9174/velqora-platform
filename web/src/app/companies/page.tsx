'use client'
import { useState } from 'react'

const COMPANIES = [
  { id: 'C-001', name: 'Velqora Enterprises B.V.', country: 'Netherlands', branches: 4, users: 18, status: 'ACTIVE', plan: 'Enterprise' },
  { id: 'C-002', name: 'Velqora Europe GmbH', country: 'Germany', branches: 3, users: 12, status: 'ACTIVE', plan: 'Professional' },
  { id: 'C-003', name: 'Velqora MENA FZE', country: 'United Arab Emirates', branches: 5, users: 24, status: 'ACTIVE', plan: 'Enterprise' },
  { id: 'C-004', name: 'Gulf Logistics Group', country: 'Saudi Arabia', branches: 2, users: 8, status: 'ACTIVE', plan: 'Professional' },
  { id: 'C-005', name: 'EuroFreight GmbH', country: 'Germany', branches: 1, users: 4, status: 'ACTIVE', plan: 'Starter' },
  { id: 'C-006', name: 'Novaport SRL', country: 'Italy', branches: 1, users: 2, status: 'INACTIVE', plan: 'Starter' },
]

const KPIS = [
  { label: 'Total Companies', value: '6', icon: 'ti-building', color: 'brand' },
  { label: 'Active', value: '5', icon: 'ti-check', color: 'success' },
  { label: 'Total Branches', value: '16', icon: 'ti-map-pin', color: 'info' },
  { label: 'Total Users', value: '68', icon: 'ti-users', color: 'indigo' },
]

export default function CompaniesPage() {
  const [search, setSearch] = useState('')
  const filtered = COMPANIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Companies</h1>
          <p className="page-subtitle">Manage tenant companies, branches, and SaaS organisation structure.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline">Import</button>
          <button className="btn-primary">+ New Company</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {KPIS.map(k => (
          <div key={k.label} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-${k.color}/10`}>
                <i className={`ti ${k.icon} text-${k.color === 'brand' ? 'brand-600' : k.color} text-base`} />
              </div>
            </div>
            <div className="text-2xl font-black text-text-primary">{k.value}</div>
            <div className="text-xs text-text-secondary mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-border flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 bg-surface-secondary border border-border rounded-btn px-3 py-1.5 w-full sm:max-w-md">
            <i className="ti ti-search text-text-disabled text-sm" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search companies..."
              className="bg-transparent text-sm outline-none w-full text-text-primary placeholder:text-text-disabled"
            />
          </div>
          <select className="text-sm border border-border rounded-btn px-3 py-1.5 bg-white text-text-secondary">
            <option>All status</option><option>Active</option><option>Inactive</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="table-base min-w-[640px]">
            <thead>
              <tr>
                <th className="table-th">Company</th>
                <th className="table-th hidden md:table-cell">Country</th>
                <th className="table-th">Branches</th>
                <th className="table-th">Users</th>
                <th className="table-th hidden sm:table-cell">Plan</th>
                <th className="table-th">Status</th>
                <th className="table-th"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="table-row">
                  <td className="table-td">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-md bg-brand-50 flex items-center justify-center text-brand-700 font-bold text-xs flex-shrink-0">
                        {c.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary text-xs sm:text-sm">{c.name}</p>
                        <p className="text-2xs text-text-disabled">{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-td text-text-secondary text-xs hidden md:table-cell">{c.country}</td>
                  <td className="table-td text-text-primary text-sm font-semibold">{c.branches}</td>
                  <td className="table-td text-text-primary text-sm font-semibold">{c.users}</td>
                  <td className="table-td hidden sm:table-cell">
                    <span className={`badge ${c.plan === 'Enterprise' ? 'badge-purple' : c.plan === 'Professional' ? 'badge-info' : 'badge-gray'}`}>{c.plan}</span>
                  </td>
                  <td className="table-td">
                    <span className={`badge ${c.status === 'ACTIVE' ? 'badge-success' : 'badge-gray'}`}>{c.status}</span>
                  </td>
                  <td className="table-td">
                    <button className="text-xs text-brand-600 font-semibold hover:underline">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
