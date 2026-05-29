import { apiClient } from '@/lib/apiClient'
import type {
  Shipment, ShipmentStatus, Priority, ShipmentEvent,
  Product, Warehouse, InventoryBalance, StockMovement, StockMovementType,
  EquipmentAsset, Company, Branch, User, DashboardOverview, PaginatedResponse,
} from '@/types'

// =========== AUTH ===========
export const authService = {
  login: (email: string, password: string) =>
    apiClient.post<{ token: string; user: User }>('/auth/login', { email, password }),
  logout: () => apiClient.post('/auth/logout'),
  me: () => apiClient.get<User>('/auth/me'),
}

// =========== DASHBOARD ===========
export const dashboardService = {
  overview: () => apiClient.get<DashboardOverview>('/dashboard/overview'),
  shipmentStatusSummary: () =>
    apiClient.get<Record<ShipmentStatus, number>>('/dashboard/logistics/status-summary'),
  equipmentStatusSummary: () =>
    apiClient.get<Record<string, number>>('/dashboard/equipment/status-summary'),
  lowStock: () => apiClient.get<InventoryBalance[]>('/dashboard/inventory/low-stock'),
}

// =========== SHIPMENTS ===========
export interface ShipmentListParams {
  page?: number
  size?: number
  status?: ShipmentStatus
  priority?: Priority
  companyId?: string
  branchId?: string
  search?: string
}

export interface CreateShipmentRequest {
  companyId: string
  branchId: string
  customerName: string
  customerReference?: string
  originAddress: string
  destinationAddress: string
  destinationCity: string
  destinationCountryCode: string
  priority: Priority
  carrierName?: string
  trackingReference?: string
  plannedDispatchDate?: string
  plannedDeliveryDate?: string
  notes?: string
}

export const shipmentService = {
  list: (params: ShipmentListParams = {}) =>
    apiClient.get<PaginatedResponse<Shipment>>('/logistics/shipments', { params }),
  get: (id: string) => apiClient.get<Shipment>(`/logistics/shipments/${id}`),
  create: (data: CreateShipmentRequest) =>
    apiClient.post<Shipment>('/logistics/shipments', data),
  update: (id: string, data: Partial<CreateShipmentRequest>) =>
    apiClient.patch<Shipment>(`/logistics/shipments/${id}`, data),
  updateStatus: (id: string, status: ShipmentStatus, notes?: string) =>
    apiClient.patch<Shipment>(`/logistics/shipments/${id}/status`, { status, notes }),
  events: (id: string) =>
    apiClient.get<ShipmentEvent[]>(`/logistics/shipments/${id}/events`),
  cancel: (id: string, reason?: string) =>
    apiClient.patch<Shipment>(`/logistics/shipments/${id}/status`, { status: 'CANCELLED', notes: reason }),
}

// =========== INVENTORY ===========
export const inventoryService = {
  products: () => apiClient.get<PaginatedResponse<Product>>('/inventory/products'),
  createProduct: (data: Partial<Product>) =>
    apiClient.post<Product>('/inventory/products', data),

  warehouses: () => apiClient.get<Warehouse[]>('/inventory/warehouses'),
  createWarehouse: (data: Partial<Warehouse>) =>
    apiClient.post<Warehouse>('/inventory/warehouses', data),

  balances: (warehouseId?: string) =>
    apiClient.get<PaginatedResponse<InventoryBalance>>('/inventory/balances', {
      params: warehouseId ? { warehouseId } : {},
    }),

  movements: (params: { warehouseId?: string; type?: StockMovementType; from?: string; to?: string } = {}) =>
    apiClient.get<PaginatedResponse<StockMovement>>('/inventory/stock-movements', { params }),

  createMovement: (data: {
    movementType: StockMovementType
    productId: string
    sourceWarehouseId?: string
    destinationWarehouseId?: string
    quantity: number
    referenceType?: string
    referenceNumber?: string
    reason?: string
  }) => apiClient.post<StockMovement>('/inventory/stock-movements', data),
}

// =========== EQUIPMENT ===========
export const equipmentService = {
  assets: () => apiClient.get<PaginatedResponse<EquipmentAsset>>('/equipment/assets'),
  get: (id: string) => apiClient.get<EquipmentAsset>(`/equipment/assets/${id}`),
  create: (data: Partial<EquipmentAsset>) =>
    apiClient.post<EquipmentAsset>('/equipment/assets', data),
  updateStatus: (id: string, status: string) =>
    apiClient.patch(`/equipment/assets/${id}/status`, { status }),
}

// =========== COMPANIES & USERS ===========
export const companyService = {
  list: () => apiClient.get<Company[]>('/companies'),
  get: (id: string) => apiClient.get<Company>(`/companies/${id}`),
  branches: (companyId: string) =>
    apiClient.get<Branch[]>(`/companies/${companyId}/branches`),
}

export const userService = {
  list: () => apiClient.get<PaginatedResponse<User>>('/users'),
  create: (data: Partial<User>) => apiClient.post<User>('/users', data),
  updateRole: (id: string, role: User['role']) =>
    apiClient.patch(`/users/${id}/role`, { role }),
}
