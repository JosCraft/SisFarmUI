export type ISalePaymentType = "efectivo" | "tarjeta_credito" | "transferencia_bancaria"
export type ISaleStatus = "completada" | "pendiente" | "cancelada"

export interface SaleItem {
  product_id: number;
  quantity: number;
}

export interface PCreateSale {
  payment_type: string;
  customer_id: number;
  items: SaleItem[];
}

export interface ISale {
  id: number
  client_id: number
  user_id: number
  total: number
  payment_type: ISalePaymentType
  status: ISaleStatus
  created_at: string // ISO string
  items?: SaleItem[] // Opcional, para cuando se cargan los detalles
}