import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import type { ICategory } from "@/interface/category";

export const useGetCategories = () => {
  return useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get("/categories");
      return data.data;
    },
    initialData: [],
    refetchOnWindowFocus: false,
  });
}