import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  shipmentService, inventoryService, equipmentService,
  dashboardService, companyService, userService,
  type ShipmentListParams, type CreateShipmentRequest,
} from '@/services'
import type { ShipmentStatus } from '@/types'

// =========== DASHBOARD ===========
export const useDashboardOverview = () =>
  useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: () => dashboardService.overview().then((r) => r.data),
  })

export const useShipmentStatusSummary = () =>
  useQuery({
    queryKey: ['dashboard', 'shipment-status-summary'],
    queryFn: () => dashboardService.shipmentStatusSummary().then((r) => r.data),
  })

export const useEquipmentStatusSummary = () =>
  useQuery({
    queryKey: ['dashboard', 'equipment-status-summary'],
    queryFn: () => dashboardService.equipmentStatusSummary().then((r) => r.data),
  })

export const useLowStockBalances = () =>
  useQuery({
    queryKey: ['dashboard', 'low-stock'],
    queryFn: () => dashboardService.lowStock().then((r) => r.data),
  })

// =========== SHIPMENTS ===========
export const useShipments = (params: ShipmentListParams = {}) =>
  useQuery({
    queryKey: ['shipments', params],
    queryFn: () => shipmentService.list(params).then((r) => r.data),
  })

export const useShipment = (id: string | undefined) =>
  useQuery({
    queryKey: ['shipments', id],
    queryFn: () => shipmentService.get(id!).then((r) => r.data),
    enabled: !!id,
  })

export const useShipmentEvents = (id: string | undefined) =>
  useQuery({
    queryKey: ['shipments', id, 'events'],
    queryFn: () => shipmentService.events(id!).then((r) => r.data),
    enabled: !!id,
  })

export const useCreateShipment = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateShipmentRequest) =>
      shipmentService.create(data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['shipments'] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export const useUpdateShipmentStatus = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status, notes }: { id: string; status: ShipmentStatus; notes?: string }) =>
      shipmentService.updateStatus(id, status, notes).then((r) => r.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ['shipments'] })
      qc.invalidateQueries({ queryKey: ['shipments', vars.id] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

// =========== INVENTORY ===========
export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: () => inventoryService.products().then((r) => r.data),
  })

export const useWarehouses = () =>
  useQuery({
    queryKey: ['warehouses'],
    queryFn: () => inventoryService.warehouses().then((r) => r.data),
  })

export const useInventoryBalances = (warehouseId?: string) =>
  useQuery({
    queryKey: ['balances', warehouseId],
    queryFn: () => inventoryService.balances(warehouseId).then((r) => r.data),
  })

export const useStockMovements = (params?: Parameters<typeof inventoryService.movements>[0]) =>
  useQuery({
    queryKey: ['stock-movements', params],
    queryFn: () => inventoryService.movements(params).then((r) => r.data),
  })

export const useCreateStockMovement = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: inventoryService.createMovement,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['balances'] })
      qc.invalidateQueries({ queryKey: ['stock-movements'] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

// =========== EQUIPMENT ===========
export const useEquipmentAssets = () =>
  useQuery({
    queryKey: ['equipment-assets'],
    queryFn: () => equipmentService.assets().then((r) => r.data),
  })

// =========== COMPANIES & USERS ===========
export const useCompanies = () =>
  useQuery({
    queryKey: ['companies'],
    queryFn: () => companyService.list().then((r) => r.data),
  })

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => userService.list().then((r) => r.data),
  })
