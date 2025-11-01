import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  console.log("[BEGIN REQUEST]", config.url);
  return config;
});

axiosInstance.interceptors.response.use((response) => {
  console.log("[END RESPONSE]", response.status);
  return response;
});
