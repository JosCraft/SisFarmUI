import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import type { PCreateSale } from "@/interface/sales";

export const useCreateSale = () => {
  return useMutation({
    mutationFn: async (data: PCreateSale) => {
      const response = await axios.post("/sale-products", data);
      return response.data;
    },
  });
};
