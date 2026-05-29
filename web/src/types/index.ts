// Velqora backend-aligned types

export type ShipmentStatus =
  | 'CREATED' | 'READY_FOR_DISPATCH' | 'DISPATCHED'
  | 'IN_TRANSIT' | 'DELAYED' | 'DELIVERED'
  | 'CANCELLED' | 'RETURNED'

export type Priority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'

export type StockMovementType = 'INBOUND' | 'OUTBOUND' | 'TRANSFER' | 'ADJUSTMENT'

export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'REORDER' | 'OUT_OF_STOCK'

export type EquipmentStatus =
  | 'INSTALLED' | 'IN_STOCK' | 'MAINTENANCE'
  | 'RETIRED' | 'INSPECTION_DUE'

export interface Shipment {
  id: string
  shipmentNumber: string
  customerName: string
  customerReference?: string
  originAddress: string
  destinationAddress: string
  destinationCity: string
  destinationCountryCode: string
  status: ShipmentStatus
  priority: Priority
  carrierName?: string
  trackingReference?: string
  plannedDispatchDate?: string
  plannedDeliveryDate?: string
  actualDeliveryDate?: string
  notes?: string
}

export interface ShipmentEvent {
  id: string
  shipmentId: string
  eventType: string
  status?: ShipmentStatus
  description: string
  occurredAt: string
  createdBy?: string
}

export interface Product {
  id: string
  sku: string
  name: string
  category: string
  unit: string
  minimumStockLevel: number
  reorderLevel: number
  status: 'ACTIVE' | 'INACTIVE'
}

export interface Warehouse {
  id: string
  code: string
  name: string
  city: string
  countryCode: string
}

export interface InventoryBalance {
  id: string
  productId: string
  sku: string
  productName: string
  warehouseId: string
  warehouseName: string
  quantityOnHand: number
  reservedQuantity: number
  availableQuantity: number
  minimumStockLevel: number
  reorderLevel: number
  lowStock: boolean
  status: StockStatus
}

export interface StockMovement {
  id: string
  movementType: StockMovementType
  productId: string
  productName: string
  sourceWarehouseId?: string
  sourceWarehouseName?: string
  destinationWarehouseId?: string
  destinationWarehouseName?: string
  quantity: number
  referenceType?: string
  referenceNumber?: string
  createdBy: string
  createdAt: string
}

export interface EquipmentAsset {
  id: string
  assetId: string
  name: string
  serialNumber: string
  type: string
  warehouseId?: string
  warehouseName?: string
  location?: string
  status: EquipmentStatus
  condition: string
  installationDate?: string
  warrantyExpiry?: string
}

export interface Company {
  id: string
  name: string
  legalName: string
  registrationNumber?: string
  countryCode: string
  status: 'ACTIVE' | 'INACTIVE'
}

export interface Branch {
  id: string
  companyId: string
  code: string
  name: string
  city: string
  countryCode: string
}

export interface User {
  id: string
  email: string
  fullName: string
  companyId: string
  role: 'ADMIN' | 'OPERATOR' | 'VIEWER' | 'WAREHOUSE_MANAGER' | 'FLEET_MANAGER'
  status: 'ACTIVE' | 'INACTIVE'
}

export interface DashboardOverview {
  shipments: number
  activeShipments: number
  delayedShipments: number
  warehouses: number
  products: number
  inventoryBalances: number
  lowStockItems: number
  equipmentAssets: number
  users: number
  branches: number
  companies: number
}

export interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}
