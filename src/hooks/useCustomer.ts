import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import type { IClientPaginate, PCreateCustomer } from "@/interface/customer";

export const useGetClientPaginate = (page: number = 1) => {
  return useQuery<IClientPaginate>({
    queryKey: ["clients-paginate", page],
    queryFn: async () => {
      const { data } = await axios.get(`/customers?page=${page}`);
      return data.data;
    },
    refetchOnWindowFocus: false,
    initialData: {
      data: [],
      pagination: {
        current_page: 1,
        has_next: false,
        has_previous: false,
        page_size: 10,
        total_items: 0,
        total_pages: 0,
      },
    },
  });
};

export const useCreateCustomer = () => {
  return useMutation({
    mutationFn: async (customerData: PCreateCustomer) => {
      const { data } = await axios.post("/customers", customerData);
      return data.data;
    },
  });
};
