package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/adhitamafikri/go-weather-api-proxy/router/openmeteo"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	fmt.Println("The Go Weather API Proxy")

	envErr := godotenv.Load()
	if envErr != nil {
		log.Fatal("Error loading .env file")
	}

	appPort := os.Getenv("APP_PORT")
	if appPort == "" {
		appPort = "8080"
	}

	// Create a Gin router with default middleware (logger and recovery)
	r := gin.Default()

	// Root route
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "The Go Weather API Proxy!"})
	})

	// API routes
	{
		v1 := r.Group("/api/v1")
		{
			v1.GET("/city", openmeteo.GetCityHandler)
			v1.GET("/forecast", openmeteo.GetForecastHandler)
		}
	}

	// Start server on port
	r.Run(":" + appPort)
}
