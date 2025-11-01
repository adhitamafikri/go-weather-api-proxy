import { axiosInstance } from "../lib/axios";

const BASE_PATH = "/v1/forecast";

export async function getForecast(params: {
  latitude: number;
  longitude: number;
}) {
  try {
    const response = await axiosInstance.get(`${BASE_PATH}`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
}
