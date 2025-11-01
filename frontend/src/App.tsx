import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { Flex, Button, TextField, Text } from "@radix-ui/themes";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import { useGeocodingApi } from "./hooks/use-geocoding-api";
import { useForecastApi } from "./hooks/use-forecast-api";
import "./App.css";

function App() {
  const [cityName, setCityName] = useState("");
  const [selectedCity, setSelectedCity] = useState<Record<
    string,
    unknown
  > | null>(null);

  const { data: geocodingData } = useGeocodingApi({
    name: cityName,
    count: 10,
  });

  const { data: forecastData } = useForecastApi({
    latitude: (selectedCity?.latitude as number) ?? 0,
    longitude: (selectedCity?.longitude as number) ?? 0,
  });

  useEffect(() => {
    console.log("geocodingData", geocodingData);
  }, [geocodingData]);

  useEffect(() => {
    console.log("forecastData", forecastData);
  }, [forecastData]);

  const cityList = useMemo(() => {
    if (geocodingData?.data) {
      return geocodingData.data.results ?? [];
    }

    return [];
  }, [geocodingData]);

  const hourlyForecastData = useMemo(() => {
    if (forecastData?.data?.hourly) {
      return forecastData.data.hourly;
    }

    return null;
  }, [forecastData]);

  useEffect(() => {
    console.log("hourlyForecastData", hourlyForecastData);
  }, [hourlyForecastData]);

  const hourlyForecastUnits = useMemo(() => {
    if (forecastData?.data?.hourly_units) {
      return forecastData.data.hourly_units;
    }

    return null;
  }, [forecastData]);

  useEffect(() => {
    console.log("hourlyForecastUnits", hourlyForecastUnits);
  }, [hourlyForecastUnits]);

  const forecastChartData = useMemo(() => {
    if (forecastData?.data) {
      const hourlyForecastData: Record<string, string[] | number[]> =
        forecastData.data.hourly;
      const dataLength = hourlyForecastData.time.length;

      const result: Record<string, string | number>[] = [];
      for (let i = 0; i < dataLength; i++) {
        result.push({
          time: dayjs(hourlyForecastData.time[i]).format("HH:mm"),
          rain: hourlyForecastData.rain[i],
          relative_humidity_2m: hourlyForecastData.relative_humidity_2m[i],
          temperature_2m: hourlyForecastData.temperature_2m[i],
          uv_index: hourlyForecastData.uv_index[i],
        });
      }

      return result;
    }

    return [];
  }, [forecastData]);

  const handleSearchCity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCityName((e.target as HTMLFormElement).city.value ?? "");
  };

  const handleCityClick = (city: Record<string, unknown>) => {
    console.log("city", city);
    setSelectedCity(city);
  };

  return (
    <Flex direction="column" gap="6">
      <form name="weather-form" autoComplete="off" onSubmit={handleSearchCity}>
        <Flex direction="column" gap="2">
          <Text size="1" as="label" weight="medium" htmlFor="city-input">
            Type the city you want to check the weather for
          </Text>
          <TextField.Root
            placeholder="Enter city"
            name="city"
            id="city-input"
          />
          <Button
            type="submit"
            role="button"
            aria-label="Search"
            variant="classic"
          >
            Search
          </Button>
        </Flex>
      </form>

      {/* City List */}
      <Flex direction="column" gap="2">
        <Text size="1" as="p" weight="medium">
          Choose a city
        </Text>
        {cityList.length === 0 ? (
          <Flex direction="column" gap="2">
            <Text as="p" style={{ fontStyle: "italic" }}>
              No cities found
            </Text>
          </Flex>
        ) : (
          <Flex direction="column" gap="2">
            {cityList.map((city: Record<string, unknown>, idx: number) => (
              <Button
                key={`city-${idx}`}
                variant="surface"
                onClick={() => handleCityClick(city)}
              >
                <Text>
                  {city.name} - {city.admin2}
                </Text>
              </Button>
            ))}
          </Flex>
        )}
      </Flex>

      {/* Forecast Data */}
      <Flex direction="column" gap="2">
        <Text size="1" as="p" weight="medium">
          Forecast Data
        </Text>
        {!selectedCity ? (
          <Flex direction="column" gap="2">
            <Text as="p" style={{ fontStyle: "italic" }}>
              Please select a city to get the forecast data
            </Text>
          </Flex>
        ) : (
          <Flex direction="column" gap="2">
            <Text as="p" style={{ fontStyle: "italic" }}>
              {selectedCity.name} - {selectedCity.admin2}
            </Text>

            <AreaChart
              style={{
                width: "100%",
                maxWidth: "700px",
                maxHeight: "70vh",
                aspectRatio: 1.618,
              }}
              responsive
              data={forecastChartData}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#56B4E9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#56B4E9" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="colorRelativeHumidity2m"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#E2A139" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#E2A139" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUvIndex" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="colorTemperature2m"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3D4A99" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3D4A99" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis width="auto" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="rain"
                stroke="#56B4E9"
                fillOpacity={1}
                fill="url(#colorRain)"
                isAnimationActive={true}
              />
              <Area
                type="monotone"
                dataKey="relative_humidity_2m"
                stroke="#E2A139"
                fillOpacity={1}
                fill="url(#colorRelativeHumidity2m)"
                isAnimationActive={true}
              />
              <Area
                type="monotone"
                dataKey="uv_index"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUvIndex)"
                isAnimationActive={true}
              />
              <Area
                type="monotone"
                dataKey="temperature_2m"
                stroke="#3D4A99"
                fillOpacity={1}
                fill="url(#colorTemperature2m)"
                isAnimationActive={true}
              />
            </AreaChart>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default App;
