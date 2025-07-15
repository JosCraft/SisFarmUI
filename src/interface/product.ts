export interface IProduct {
  id: number;
  code: string;
  name: string;
  category_id: number;
  presentation_id: number;
  unit: string;
  price: number;
  descuento: number;
  stock: number;
  stock_min: number;
  description?: string;
  created_at: string; // ISO string
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IPresentation {
  id: number;
  name: string;
}

export interface IProductPagination {
  data: IProduct[];
  pagination: {
    current_page: number;
    has_next: boolean;
    has_previous: boolean;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export interface PCreateProduct {
  code: string;
  name: string;
  category_id: number;
  presentation_id: number;
  unit: string;
  price: number;
  descuento: number;
  stock: number;
  stock_min: number;
  description?: string;
}

export interface PUpdateProduct {
  id: number;
  name: string;
  category_id: number;
  presentation_id: number;
  unit: string;
  price: number;
  descuento: number;
  stock_min: number;
  description?: string;
}