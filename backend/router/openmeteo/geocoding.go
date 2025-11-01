package openmeteo

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func GetCityHandler(c *gin.Context) {
	searchQuery := c.Query("name")
	fmt.Println("Search Query:", searchQuery)

	// Call the OpenMeteo Geocoding API
	// Load from env variable
	geocodingApiBaseUrl := os.Getenv("OPENMETEO_GEOCODING_API_BASE_URL")
	if geocodingApiBaseUrl == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "OPENMETEO_GEOCODING_API_BASE_URL is not set"})
		return
	}

	// Build the full OpenMeteo Geocoding API URL
	fullUrl := fmt.Sprintf("%s/search?name=%s", geocodingApiBaseUrl, searchQuery)

	// Make the HTTP GET request to the OpenMeteo Geocoding API
	resp, err := http.Get(fullUrl)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to make the HTTP GET request to the OpenMeteo Geocoding API"})
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
	var geocodingResponse map[string]interface{}
	err = json.Unmarshal(body, &geocodingResponse)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse the response body"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Geocoding Endpoint", "data": geocodingResponse})
}
