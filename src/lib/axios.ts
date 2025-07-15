import { URL_API } from "@/config";
import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: URL_API + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status >= 401) {
      toast.error(error.response.data.message || "Unauthorized access. Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
