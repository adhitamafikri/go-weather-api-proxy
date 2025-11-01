import { useState, useEffect, useMemo } from "react";
import { Flex, Button, TextField, Text } from "@radix-ui/themes";
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

  const hourlyForecastUnits = useMemo(() => {
    if (forecastData?.data?.hourly_units) {
      return forecastData.data.hourly_units;
    }

    return null
  }, [forecastData]);

  useEffect(() => {
    console.log("hourlyForecastUnits", hourlyForecastUnits);
  }, [hourlyForecastUnits]);

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
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default App;
