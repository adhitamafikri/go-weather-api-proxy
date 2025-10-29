# The Go Weather API Proxy

Accelerated learning in Go topic that is covering:

- Basic Backend Engineering with Go
- External API Integration [https://open-meteo.com/](https://open-meteo.com/)
- Caching with Redis
- Rate Limiter per IP
- Graceful Error Handling

## How does this program work?

1. User searches for the city they want to check the weather
2. User calls the weather for
3. Weather Forecast Response would be cached in Redis with TTL 5 minutes

## OpenMeteo Endpoints Used in this Project

1. Geocoding API to search city -> `https://geocoding-api.open-meteo.com/v1/search?name=Depok`
2. OpenMeteo Forecast API to get the actual weather forecast data for the selected city -> `https://api.open-meteo.com/v1/forecast`

## Learning Objective

- Fetch data from public weather API (OpenWeather, WeatherAPI)
- Cache responses in Redis (5-10 min TTL)
- Accept city name, return formatted weather data
- Handle API errors gracefully
🤽‍♂️ Skills hit: HTTP client, JSON parsing, Redis GET/SET, error propagation, external API integration
