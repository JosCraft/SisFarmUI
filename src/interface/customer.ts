import type { IBasePagination } from "./globals";

export interface IClient {
  id: string;
  full_name: string;
  ci: string;
  address: string;
  phone: string;
}

export interface PCreateCustomer {
  full_name: string;
  ci: string;
  address: string;
  phone: string;
}

export interface IClientPaginate {
  data: IClient[];
  pagination: IBasePagination;
}