import { useMutation } from "@tanstack/react-query";
import axios from '@/lib/axios'
import type { PLogin, PRegister } from "@/interface/auth";
import { } from "@/store/useAuthStore";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: PLogin) => {
      const response = await axios.post("/auth/login", credentials);
      return response.data;
    },
  });
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (credentials: PRegister) => {
      const response = await axios.post("/users", credentials);
      console.log("DATOS DE REGISTRO:", response.data);
      return response.data;
    }
  });
}