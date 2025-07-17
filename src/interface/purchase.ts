import type { IBasePagination } from "./globals"

export type IPaymentType = "efectivo" | "tarjeta" | "transferencia" | "credito"
export type IPurchaseStatus = "pendiente" | "completada" | "cancelada"

export interface IPurchasePaginate {
  data: IPurchase[]
  pagination: IBasePagination
}

export interface IPurchase {
  id: number
  provider_id: number
  user_id: number
  total: number
  payment_type: IPaymentType
  status: IPurchaseStatus
  created_at: string
  items?: IPurchaseItem[]
}

export interface IPurchaseItem {
  id: number
  purchase_id: number
  product_id: number
  quantity: number
  unit_price: number
  subtotal: number
  expiration_date: string
  batch_code: string
}

export interface PCreatePurchase {
  provider_id: number
  payment_type: IPaymentType
  items: Array<{
    product_id: number
    quantity: number
    unit_price: number
    expiration_date: string
    batch_code: string
  }>
}
