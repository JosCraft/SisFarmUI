export interface Provider {
  id: number;
  name: string;
  nit: string;
  phone: string;
  address: string;
}

export interface ProviderPagination {
  data: Provider[];
  pagination: {
    current_page: number;
    has_next: boolean;
    has_previous: boolean;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export interface PCreateProvider {
  name: string;
  nit: string;
  phone: string;
  address: string;
}

export interface PEditProvider {
  id: number;
  name: string;
  nit: string;
  phone: string;
  address: string;
}
