export interface User {
  id: number;
  username: string;
  password_hash: string; // En una app real, esto no se manejaría en el frontend
  full_name: string;
  phone: string;
  address: string;
  role_id: number;
  status: boolean;
}

export interface Role {
  id: number;
  name: string;
}

export interface PCreateUser {
  username: string;
  full_name: string;
  phone: string;
  address: string;
  password_hash: string;
  role_id: number;
}

export interface PUpdateUser {
  id: number;
  full_name?: string;
  phone?: string;
  address?: string;
  status?: boolean;
}

export interface PUpdateRol {
  id: number;
  role_id: number;
}

export interface UserPagination {
  data: User[];
  pagination: {
    current_page: number;
    has_next: boolean;
    has_previous: boolean;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}
