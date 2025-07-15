import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import type {
  PCreateUser,
  PUpdateRol,
  PUpdateUser,
  UserPagination,
} from "@/interface/user";
import queryClient from "@/queryclient";

export const useGetUsers = (page: number = 1) => {
  return useQuery<UserPagination>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`/users?page=${page}&page_size=10`);
      return data.data;
    },
    refetchOnWindowFocus: false,
    initialData: {
      data: [],
      pagination: {
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        page_size: 10,
        has_next: false,
        has_previous: false,
      },
    },
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (user: PCreateUser) => {
      const { data } = await axios.post("/users", user);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async (user: PUpdateUser) => {
      const { data } = await axios.put(`/users/${user.id}`, user);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateRole = () => {
  return useMutation({
    mutationFn: async ({ id, role_id }: PUpdateRol) => {
      const { data } = await axios.put(`/users/${id}/role/${role_id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: async (userId: number) => {
      const { data } = await axios.delete(`/users/${userId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
