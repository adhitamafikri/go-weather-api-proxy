package openmeteo

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ForecastRoutes() func(c *gin.Context) {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Forecast Endpoint"})
	}
}
