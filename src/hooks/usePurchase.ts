import { useMutation } from "@tanstack/react-query";
import axios from '@/lib/axios';
import type { PCreatePurchase } from "@/interface/purchase";

export const useCreatePurchase = () => {
  return useMutation({
    mutationFn: async (data: PCreatePurchase) => {
      const response = await axios.post('/purchase-products', data);
      return response.data;
    },
    onError: (error) => {
      console.error("Error creating purchase:", error);
    }
  });
};