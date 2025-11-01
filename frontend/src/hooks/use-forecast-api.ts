import { useQuery } from "@tanstack/react-query";
import { forecastQueryKeys } from "../lib/query-keys";
import { getForecast } from "../api/forecast.api";

export function useForecastApi({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  return useQuery({
    queryKey: forecastQueryKeys.daily({ latitude, longitude }),
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const result = await getForecast({ latitude, longitude });
      return result;
    },
  });
}
