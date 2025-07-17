export type ITypePayment = "efectivo" | "tarjeta" | "transferencia";

export interface IBasePagination {
  current_page: number;
  has_next: boolean;
  has_previous: boolean;
  page_size: number;
  total_items: number;
  total_pages: number;
}
