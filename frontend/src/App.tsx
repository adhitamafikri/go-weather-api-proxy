import { useState, useEffect } from "react";
import { Box, Flex, Button, TextField, Text } from "@radix-ui/themes";
import { useGeocodingApi } from "./hooks/use-geocoding-api";
import "./App.css";

function App() {
  const [cityName, setCityName] = useState("");

  const { data: geocodingData } = useGeocodingApi({
    name: cityName,
    count: 10,
  });

  useEffect(() => {
    console.log("geocodingData", geocodingData);
  }, [geocodingData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCityName((e.target as HTMLFormElement).city.value ?? "");
  };

  return (
    <Flex direction="column" gap="2">
      <Box width="100%" height="180px" />

      <form name="weather-form" autoComplete="off" onSubmit={handleSubmit}>
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
    </Flex>
  );
}

export default App;
