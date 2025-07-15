import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import type { PCreateProvider, PEditProvider, ProviderPagination } from "@/interface/provider";
import queryClient from "@/queryclient";

export const useGetSuppliers = (page: number = 1) => {
  return useQuery<ProviderPagination>({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const { data } = await axios.get(`/providers?page=${page}&page_size=10`);
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

export const useCreateSupplier = () => {
  return useMutation({
    mutationFn: async (newProvider: PCreateProvider) => {
      const { data } = await axios.post("/providers", newProvider);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
}

export const useUpdateSupplier = () => {
  return useMutation({
    mutationFn: async (updatedProvider: PEditProvider) => {
      const { data } = await axios.put(`/providers/${updatedProvider.id}`, updatedProvider);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
};

export const useDeleteSupplier = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/providers/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
};