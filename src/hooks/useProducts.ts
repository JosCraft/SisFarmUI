import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import type {
  IProduct,
  IProductPagination,
  PCreateProduct,
  PUpdateProduct,
} from "@/interface/product";
import queryClient from "@/queryclient";

export const useGetProducts = () => {
  return useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get(`/products`);
      return data.data;
    },
    initialData: []
  });
};

export const useGetProductsPaginate = (page: number = 1) => {
  return useQuery<IProductPagination>({
    queryKey: ["products-paginate", page],
    queryFn: async () => {
      const { data } = await axios.get(`/products/paginate?page=${page}&page_size=10`);
      console.log(data);
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
        total_pages: 0,
      },
    },
  });
};

export const useProductMinStock = () => {
  return useQuery<IProduct[]>({
    queryKey: ["productMinStock"],
    queryFn: async () => {
      const { data } = await axios.get("/products/min-stock");
      return data.data;
    },
    refetchOnWindowFocus: false,
    initialData: [],
  });
}

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (product: PCreateProduct) => {
      const { data } = await axios.post("/products", product);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: async (product: PUpdateProduct) => {
      const { data } = await axios.put(`/products/${product.id}`, product);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: async (productId: number) => {
      const { data } = await axios.delete(`/products/${productId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
