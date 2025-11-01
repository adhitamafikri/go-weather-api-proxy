package openmeteo

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func GetForecastHandler(c *gin.Context) {
	latitude := c.Query("latitude")
	longitude := c.Query("longitude")

	fmt.Println("Latitude:", latitude)
	fmt.Println("Longitude:", longitude)

	// Call the OpenMeteo Forecast API
	// Load from env variable
	forecastApiBaseUrl := os.Getenv("OPENMETEO_API_BASE_URL")
	if forecastApiBaseUrl == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "OPENMETEO_API_BASE_URL is not set"})
		return
	}

	// Build the full OpenMeteo Forecast API URL
	fullUrl := fmt.Sprintf("%s/forecast?latitude=%s&longitude=%s&forecast_days=7&hourly=temperature_2m,relative_humidity_2m,rain,uv_index", forecastApiBaseUrl, latitude, longitude)

	// Make the HTTP GET request to the OpenMeteo Forecast API
	resp, err := http.Get(fullUrl)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to make the HTTP GET request to the OpenMeteo Forecast API"})
		return
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read the response body"})
		return
	}

	// Parse the response body
	var forecastResponse map[string]interface{}
	err = json.Unmarshal(body, &forecastResponse)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse the response body"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Forecast Endpoint", "data": forecastResponse})
}
