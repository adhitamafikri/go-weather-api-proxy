export const cityQueryKeys = {
  all: ["cities"] as const,
  list: (params: { name: string; count: number }) =>
    [...cityQueryKeys.all, params] as const,
};

export const forecastQueryKeys = {
  all: ["forecasts"] as const,
  daily: (params: { latitude: number; longitude: number }) =>
    [...forecastQueryKeys.all, params] as const,
};
