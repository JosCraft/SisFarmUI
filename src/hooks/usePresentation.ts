import { useQuery } from "@tanstack/react-query"; 
import axios from "@/lib/axios";
import type { IPresentation } from "@/interface/presentation";

export const useGetPresentations = () => {
  return useQuery<IPresentation[]>({
    queryKey: ["presentations"],
    queryFn: async () => {
      const { data } = await axios.get("/presentations");
      return data.data;
    },
    refetchOnWindowFocus: false,
    initialData: [],
  });
}