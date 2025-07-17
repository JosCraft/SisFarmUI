import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import type { IPurchasePaginate, PCreatePurchase } from "@/interface/purchase";

export const usePurchasesPaginate = (page: number) => {
  return useQuery<IPurchasePaginate>({
    queryKey: ["purchases", page],
    queryFn: async () => {
      const { data } = await axios.get(`/purchases/paginate/?page=${page}`);
      return data.data;
    },
    initialData: {
      data: [],
      pagination: {
        current_page: 1,
        has_next: false,
        has_previous: false,
        page_size: 10,
        total_items: 0,
        total_pages: 1,
      },
    },
  });
};

export const useCreatePurchase = () => {
  return useMutation({
    mutationFn: async (data: PCreatePurchase) => {
      const response = await axios.post("/purchase-products", data);
      return response.data;
    },
    onError: (error) => {
      console.error("Error creating purchase:", error);
    },
  });
};
