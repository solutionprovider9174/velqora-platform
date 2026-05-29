'use client'
import { useState } from 'react'

const USERS = [
  { id: 'U-001', name: 'Admin User', email: 'admin@velqora.com', company: 'Velqora Enterprises', role: 'ADMIN', status: 'ACTIVE', lastLogin: '2m ago' },
  { id: 'U-002', name: 'Sarah Chen', email: 'sarah.chen@velqora.com', company: 'Velqora Europe', role: 'OPERATOR', status: 'ACTIVE', lastLogin: '18m ago' },
  { id: 'U-003', name: 'Ahmed Al-Mansouri', email: 'ahmed@gulflogistics.ae', company: 'Velqora MENA', role: 'WAREHOUSE_MANAGER', status: 'ACTIVE', lastLogin: '1h ago' },
  { id: 'U-004', name: 'Maria Rossi', email: 'maria@novaport.it', company: 'Novaport SRL', role: 'OPERATOR', status: 'ACTIVE', lastLogin: '3h ago' },
  { id: 'U-005', name: 'Tomasz Kowalski', email: 'tomasz@eurofreight.de', company: 'EuroFreight GmbH', role: 'FLEET_MANAGER', status: 'ACTIVE', lastLogin: '2d ago' },
  { id: 'U-006', name: 'Khalid Al-Rashid', email: 'khalid@gulflogistics.ae', company: 'Gulf Logistics', role: 'VIEWER', status: 'INACTIVE', lastLogin: '14d ago' },
]

const ROLE_BADGE: Record<string, string> = {
  ADMIN: 'badge-danger',
  OPERATOR: 'badge-info',
  WAREHOUSE_MANAGER: 'badge-indigo',
  FLEET_MANAGER: 'badge-purple',
  VIEWER: 'badge-gray',
}

const ROLE_LABEL: Record<string, string> = {
  ADMIN: 'Admin',
  OPERATOR: 'Operator',
  WAREHOUSE_MANAGER: 'Warehouse Mgr',
  FLEET_MANAGER: 'Fleet Mgr',
  VIEWER: 'Viewer',
}

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const filtered = USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="responsive-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Users & Access</h1>
          <p className="page-subtitle">Manage user accounts, roles, permissions, and authentication.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline">Invite Users</button>
          <button className="btn-primary">+ New User</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total Users', value: '68', icon: 'ti-users', tone: 'brand-50 text-brand-700' },
          { label: 'Active', value: '64', icon: 'ti-user-check', tone: 'success/10 text-success' },
          { label: 'Inactive', value: '4', icon: 'ti-user-off', tone: 'gray-100 text-gray-600' },
          { label: 'Admins', value: '6', icon: 'ti-shield-check', tone: 'danger/10 text-danger' },
        ].map(k => (
          <div key={k.label} className={`rounded-xl p-3 sm:p-4 bg-${k.tone}`}>
            <div className="flex items-center gap-2 mb-1">
              <i className={`ti ${k.icon} text-base`} />
              <span className="text-xs opacity-80">{k.label}</span>
            </div>
            <div className="text-2xl font-black">{k.value}</div>
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
              placeholder="Search by name or email..."
              className="bg-transparent text-sm outline-none w-full text-text-primary placeholder:text-text-disabled"
            />
          </div>
          <select className="text-sm border border-border rounded-btn px-3 py-1.5 bg-white text-text-secondary">
            <option>All roles</option><option>Admin</option><option>Operator</option><option>Warehouse Manager</option><option>Fleet Manager</option><option>Viewer</option>
          </select>
          <select className="text-sm border border-border rounded-btn px-3 py-1.5 bg-white text-text-secondary">
            <option>All status</option><option>Active</option><option>Inactive</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="table-base min-w-[680px]">
            <thead>
              <tr>
                <th className="table-th">User</th>
                <th className="table-th hidden md:table-cell">Company</th>
                <th className="table-th">Role</th>
                <th className="table-th hidden sm:table-cell">Last Login</th>
                <th className="table-th">Status</th>
                <th className="table-th"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="table-row">
                  <td className="table-td">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xs flex-shrink-0">
                        {u.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary text-xs sm:text-sm">{u.name}</p>
                        <p className="text-2xs text-text-disabled">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-td text-text-secondary text-xs hidden md:table-cell">{u.company}</td>
                  <td className="table-td">
                    <span className={`badge ${ROLE_BADGE[u.role]}`}>{ROLE_LABEL[u.role]}</span>
                  </td>
                  <td className="table-td text-text-secondary text-xs hidden sm:table-cell">{u.lastLogin}</td>
                  <td className="table-td">
                    <span className={`badge ${u.status === 'ACTIVE' ? 'badge-success' : 'badge-gray'}`}>{u.status}</span>
                  </td>
                  <td className="table-td">
                    <button className="text-xs text-brand-600 font-semibold hover:underline">Edit</button>
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
