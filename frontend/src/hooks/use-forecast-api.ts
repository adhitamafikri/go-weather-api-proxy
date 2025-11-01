import { useQuery } from "@tanstack/react-query";
import { forecastQueryKeys } from "../lib/query-keys";
import { getForecast } from "../api/forecast.api";
import { sanitizeQueryParams } from "../lib/query-params";

export function useForecastApi(params: {
  latitude: number;
  longitude: number;
}) {
  const sanitizedParams = sanitizeQueryParams(params);
  return useQuery({
    enabled: !!params.latitude && !!params.longitude,
    queryKey: forecastQueryKeys.daily(sanitizedParams),
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const result = await getForecast(sanitizedParams);
      return result;
    },
  });
}
