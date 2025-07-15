import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import type { IPharmacy } from "@/interface/pharmacy";

export const useGetPharmacies = () => {
  return useQuery<IPharmacy[]>({
    queryKey: ["pharmacies"],
    queryFn: async () => {
      const { data } = await axios.get("/pharmacies");
      return data.data;
    },
    refetchOnWindowFocus: false,
    initialData: [],
  });
};
