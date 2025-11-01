import { axiosInstance } from "../lib/axios";

const BASE_PATH = "/v1/geocoding";

export async function getCities(params: { city: string }) {
  try {
    const response = await axiosInstance.get(`${BASE_PATH}/cities`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    throw error;
  }
}
