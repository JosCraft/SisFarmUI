import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import type { IProduct } from "@/interface/product";

export const useGetProducts = () => {
  return useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("/products");
      return data.data;
    },
    initialData: [],
  });
};
