import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import type { IRole } from "@/interface/role";

export const useGetRol = () => {
  return useQuery<IRole[]>({
    queryKey: ["roles"],
    queryFn: async () => {
      const { data } = await axios.get("/roles");
      return data.data;
    },
    refetchOnWindowFocus: false,
    initialData: [],
  });
};