import { useQuery } from "@tanstack/react-query";
import { cityQueryKeys } from "../lib/query-keys";
import { getCities } from "../api/geocoding.api";
import { sanitizeQueryParams } from "../lib/query-params";

export function useGeocodingApi(params: { name: string; count: number }) {
  const sanitizedParams = sanitizeQueryParams(params);
  return useQuery({
    enabled: !!params.name,
    queryKey: cityQueryKeys.list(sanitizedParams),
    staleTime: 1000 * 60 * 2,
    queryFn: async () => {
      const result = await getCities(sanitizedParams);
      return result;
    },
  });
}
